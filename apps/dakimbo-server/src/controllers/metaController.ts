import { getUniqueValues } from './../../../../libs/utilities/src/lib/utilities/arrays/getUniqueValues';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import chalk from 'chalk';

import config from '../config';
import { Database } from '../database/database';
import { entityMap } from './../../../../libs/entities/_entity-map';
import { ignoreProps } from './../../../../libs/entities/entity-utilities';

export class MetaController {
	async getAllEntitiesMetadata(req: Request, res: Response) {
		try {
			const entityNames = Object.keys(entityMap)
				.map((model) => {
					return entityMap[model].displayName || model;
				})
				.filter(
					(name) =>
						![
							'User',
							'AuthRole',
							'AuthAction',
							'AuthRoleAction',
							'MetricPageView',
							'MetricPageVisit'
						].includes(name)
				)
				.sort();

			res.send(entityNames);
		} catch (e) {
			console.error(`ERROR: ${e}`);
			res.status(500).send(e);
		}
	}

	async getEntityMetadata(req: Request, res: Response) {
		const entityName = req.params.entity;
		if (!entityName) {
			res.send('You must include the resource name to get these entities from!');
			return;
		}

		const userJwt = <any>jwt.verify(<string>res.getHeader('token'), config.jwtSecret);

		try {
			const metadata = Database._connection.getMetadata(entityName);
			const properties = Object.keys(metadata.propertiesMap)
				.filter((p) => !ignoreProps.includes(p))
				.sort();

			console.log(
				`METADATA: ${chalk.yellow(entityName)} | # of Props: ${
					properties.length
				} | USER: ${chalk.magenta(userJwt.username)}`
			);

			res.send(properties);
		} catch (e) {
			console.error(`Could not find metadata for entity ${entityName}...`);
			res.status(500).send(e);
		}
	}

	async getUniqueValuesForPropInEntity(req: Request, res: Response) {
		const entityName = req.params.entity,
			prop = req.params.prop;
		if (!entityName) {
			res.send('You must include the resource name to get these unique values from!');
			return;
		}
		if (!prop) {
			res.send('You must include the property to get the unique values for!');
			return;
		}

		const userJwt = <any>jwt.verify(<string>res.getHeader('token'), config.jwtSecret);

		try {
			const values = await Database._connection
				.getRepository(entityName)
				.createQueryBuilder(entityName)
				.getMany();

			const uniqueValues = getUniqueValues(values, prop)
				.filter((v) => v)
				.sort();

			console.log(
				`METADATA: ${chalk.yellow(entityName)} | # of Unique Values: ${
					uniqueValues.length
				} | USER: ${chalk.magenta(userJwt.username)}`
			);

			res.send(uniqueValues);
		} catch (e) {
			console.error(
				`Could not find unique values for entity: ${chalk.yellow(
					entityName
				)}, prop: ${prop}`
			);
		}
	}
}
export default MetaController;
