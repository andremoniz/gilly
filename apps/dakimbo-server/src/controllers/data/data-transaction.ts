import { logDataTransaction, logDataTransactionError } from './log-data-transaction';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';

import { entityMap } from '../../../../../libs/entities/_entity-map';
import config from '../../config';
import { Database } from '../../database/database';
import { checkModelAllowedRoles } from './../../../../../libs/utilities/src/lib/auth/checkModelAllowedRoles';

export class DataTransaction {
	req: Request;
	res: Response;

	entityName: string;
	dataObject: any;
	model: any;
	concreteModel: any;
	repo: Repository<any>;

	userJwt: any;

	constructor(req: Request, res: Response) {
		this.req = req;
		this.res = res;

		this.entityName = this.req.params.entity;
		this.model = entityMap[this.entityName];
		this.concreteModel = new this.model();
		this.dataObject = req.body;
		this.repo = Database._connection.getRepository(this.entityName);

		if (!this.model.ignoreAuthorization) {
			this.userJwt = <any>jwt.verify(<string>this.res.getHeader('token'), config.jwtSecret);
		} else {
			this.userJwt = {
				username: 'guest'
			};
		}

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

		// Ensure cache is cleared since entity changed
		// Database._connection.queryResultCache.remove([this.entityName]);
	}

	private async executeSave() {
		const start = Date.now();

		const isArray = Array.isArray(this.dataObject);

		if (isArray) {
			this.dataObject.forEach((d) => this.setEntityUser(d));
		} else {
			this.setEntityUser(this.dataObject);
			if (!this.dataObject.id && this.req.params.id) this.dataObject.id = this.req.params.id;
		}

		try {
			if (this.concreteModel.preProcess) {
				if (isArray) {
					const preProcessPromises = [];
					this.dataObject.forEach((o) =>
						preProcessPromises.push(
							this.concreteModel.preProcess(
								o,
								Database._connection,
								this.entityName,
								this.userJwt
							)
						)
					);
					await Promise.all(preProcessPromises);
				} else {
					await this.concreteModel.preProcess(
						this.dataObject,
						Database._connection,
						this.entityName,
						this.userJwt
					);
				}
			}

			let savedEntity = await this.repo.save(this.dataObject);

			if (this.concreteModel.postProcess) {
				if (isArray) {
					const postProcessPromises = [];
					this.dataObject.forEach((o) =>
						postProcessPromises.push(
							this.concreteModel.postProcess(
								o,
								Database._connection,
								this.entityName,
								this.userJwt
							)
						)
					);
					await Promise.all(postProcessPromises);
				} else {
					await this.concreteModel.postProcess(
						this.dataObject,
						Database._connection,
						this.entityName,
						this.userJwt
					);
				}
			}

			if (this.model.loadAfterSave) {
				savedEntity = await this.repo.findOne(this.dataObject.id);
			}

			const end = Date.now();
			logDataTransaction(
				<any>this.req.method,
				this.entityName,
				savedEntity,
				this.userJwt,
				end - start
			);

			this.res.send(savedEntity);
		} catch (e) {
			const end = Date.now();
			logDataTransactionError(
				e,
				<any>this.req.method,
				this.entityName,
				this.userJwt,
				end - start
			);
			this.res.status(500).send(e);
		}
	}

	private async executeDelete() {
		const start = Date.now();

		const idToDelete = this.req.params.id;
		const isArray = Array.isArray(this.dataObject);

		try {
			await this.repo.delete(isArray ? this.dataObject : idToDelete);

			const end = Date.now();
			logDataTransaction(
				<any>this.req.method,
				this.entityName,
				this.dataObject,
				this.userJwt,
				end - start
			);

			this.res.send({
				id: idToDelete
			});
		} catch (e) {
			const end = Date.now();
			logDataTransactionError(
				e,
				<any>this.req.method,
				this.entityName,
				this.userJwt,
				end - start
			);
			this.res.status(500).send(e);
		}
	}

	private setEntityUser(entity) {
		entity.modifyUser = this.userJwt.username;
		if (this.req.method === 'POST') {
			entity.createUser = this.userJwt.username;
		}
	}
}
