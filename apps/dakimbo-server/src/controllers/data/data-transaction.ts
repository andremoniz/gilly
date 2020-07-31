import { entityMap } from '@entities';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';

import config from '../../config';
import { Database } from '../../database/database';
import { checkModelAllowedRoles } from './../../../../../libs/utilities/src/lib/auth/checkModelAllowedRoles';

export class DataTransaction {
	req: Request;
	res: Response;

	entityName: string;
	dataObject: any;
	model: any;
	repo: Repository<any>;

	userJwt: any;

	constructor(req: Request, res: Response) {
		this.req = req;
		this.res = res;

		this.entityName = this.req.params.entity;
		this.model = entityMap[this.entityName];
		this.dataObject = req.body;
		this.repo = Database._connection.getRepository(this.entityName);

		this.userJwt = <any>jwt.verify(<string>this.res.getHeader('token'), config.jwtSecret);

		if (!this.entityName) {
			this.res.send('You must include the resource name to post this entity to!');
			return;
		}

		if (!checkModelAllowedRoles(this.model, this.userJwt)) {
			this.res.status(403).send('You are not allowed to transaction this entity!');
			return;
		}
	}

	async performTransaction() {
		if (['POST', 'PATCH', 'PUT'].includes(this.req.method)) {
			await this.executeSave();
		} else if (this.req.method === 'DELETE') {
			await this.executeDelete();
		}
	}

	private async executeSave() {
		const isArray = Array.isArray(this.dataObject);

		if (isArray) {
			this.dataObject.forEach((d) => this.setEntityUser(d));
		} else {
			this.setEntityUser(this.dataObject);
			if (!this.dataObject.id && this.req.params.id) this.dataObject.id = this.req.params.id;
		}

		try {
			if (this.model.preProcess) {
				if (isArray) {
					const preProcessPromises = [];
					this.dataObject.forEach((o) =>
						preProcessPromises.push(this.model.preProcess(o))
					);
					await Promise.all(preProcessPromises);
				} else {
					await this.model.preProcess(this.dataObject);
				}
			}

			let savedEntity = await this.repo.save(this.dataObject);

			if (this.model.postProcess) {
				if (isArray) {
					const postProcessPromises = [];
					this.dataObject.forEach((o) =>
						postProcessPromises.push(this.model.postProcess(o))
					);
					await Promise.all(postProcessPromises);
				} else {
					await this.model.postProcess(this.dataObject);
				}
			}

			if (this.model.loadAfterCreate) {
				savedEntity = await this.repo.findOne(this.dataObject.id);
			}

			console.log(
				`${this.req.method}: ${this.entityName} | ${
					isArray ? 'Length: ' + savedEntity.length : savedEntity.id
				} | USER: ${this.userJwt.username}`
			);

			this.res.send(savedEntity);
		} catch (e) {
			this.res.status(500).send(e);
			console.error(
				`${this.req.method} FAILED: ${this.entityName} | USER: ${this.userJwt.username}`
			);
			console.error(`ERROR: `, e);
		}
	}

	private async executeDelete() {
		const idToDelete = this.req.params.id;
		const isArray = Array.isArray(this.dataObject);

		try {
			await this.repo.delete(isArray ? this.dataObject : idToDelete);

			console.log(
				`DELETE: ${this.entityName} | ${
					isArray ? 'Length: ' + this.dataObject.length : idToDelete
				} | USER: ${this.userJwt.username}`
			);

			this.res.send({
				id: idToDelete
			});
		} catch (e) {
			this.res.status(500).send(e);
			console.error(
				`DELETE FAILED: ${this.entityName} | ${idToDelete} | USER: ${this.userJwt.username}`
			);
			console.error(`ERROR: `, e);
		}
	}

	private setEntityUser(entity) {
		entity.modifyUser = this.userJwt.username;
		if (this.req.method === 'POST') {
			entity.createUser = this.userJwt.username;
		}
	}
}
