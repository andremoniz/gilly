import { getRepository } from 'typeorm';
import { FormMedia } from './../../../../libs/entities/form-taking/form-media';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import path from 'path';

import { entityMap } from '../../../../libs/entities/_entity-map';
import config from '../config';
import { FormBaseModel } from '../../../../libs/entities/form-taking/_form-base';
import { convertByteToHuman } from '../../../../libs/utilities/src';

const os = require('os');
const mkdirp = require('mkdirp');

export class MediaController {
	async uploadMedia(req: Request, res: Response) {
		const entityName = req.params.entity;
		const entityId = req.params.id;

		if (entityName) {
			const model = entityMap[entityName];

			let userJwt;
			if (!model.ignoreAuthorization) {
				userJwt = <any>jwt.verify(<string>res.getHeader('token'), config.jwtSecret);
			} else {
				userJwt = {
					username: 'guest'
				};
			}
		}

		const media = (<any>req).files.media;
		let mediaFiles = [];
		if (!media.length) {
			mediaFiles = [media];
		} else {
			mediaFiles = media;
		}

		const mediaMap = {};

		mediaFiles.forEach(async (f: File | any) => {
			let directoryPath = `${__dirname}${config.pathToMedia}${
				entityName ? '/' + entityName.toLowerCase() : ''
			}${entityId ? '/' + entityId : ''}`;
			let mediaPath = `${directoryPath}/${f.name}`;
			if (os.platform() === 'win32') {
				directoryPath = directoryPath.replace('/', '\\');
				mediaPath = mediaPath.replace('/', '\\');
			}
			directoryPath = path.resolve(directoryPath);
			mediaPath = path.resolve(mediaPath);

			await mkdirp(directoryPath, { recursive: true });

			f.mv(mediaPath, (error) => {
				if (error) {
					console.error(error);
					res.writeHead(500, { 'Content-Type': 'application/json' });
					return;
				}
			});

			mediaMap[mediaPath] = f;
		});

		const mediaEntities = await this.handleEntityMediaUpload(mediaMap, entityName, entityId);
		res.status(201).send(mediaEntities);
	}

	handleGeneralMediaUpload() {}

	async handleEntityMediaUpload(
		media: { [path: string]: File },
		entityName: string,
		entityId?: string
	) {
		let fullEntity: FormBaseModel;
		try {
			fullEntity = <FormBaseModel>await getRepository(entityName).findOneOrFail(entityId);
		} catch (e) {
			// couldn't find, need to create one
			fullEntity = <FormBaseModel>await getRepository(entityName).save({});
		}

		let mediaEntities: FormMedia[] = [];
		Object.keys(media).forEach((path) => {
			const file = media[path];

			let extension;
			try {
				extension = file.name.split('.')[1];
			} catch (e) {
				extension = '';
			}

			mediaEntities.push(
				new FormMedia({
					mediaName: file.name,
					extension: extension,
					size: file.size,
					sizeFormatted: convertByteToHuman(file.size),
					type: file.type,
					description: '',
					category: '',
					url: '',
					thumbnail: '',
					relativePath: path.split('public')[1],
					entityName: entityName,
					formEntity: fullEntity.formEntity
				})
			);
		});

		if (mediaEntities.length)
			mediaEntities = await getRepository('FormMedia').save(mediaEntities);

		return mediaEntities;
	}
}
