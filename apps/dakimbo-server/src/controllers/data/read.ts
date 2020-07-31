import { entityMap } from '@entities';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getManager, IsNull, Repository } from 'typeorm';

import { checkModelAllowedRoles } from '../../../../../libs/utilities/src/lib/auth/checkModelAllowedRoles';
import config from '../../config';
import { Database } from '../../database/database';

export const readData = async (req: Request, res: Response) => {
	const entityName = req.params.entity;
	if (!entityName) {
		res.send('You must include the resource name to get these entities from!');
		return;
	}

	const userJwt = <any>jwt.verify(<string>res.getHeader('token'), config.jwtSecret);

	const model = entityMap[entityName];

	if (!checkModelAllowedRoles(model, userJwt)) {
		this.res.status(403).send('You are not allowed to transaction this entity!');
		return;
	}

	try {
		let repo = Database._connection.getRepository(entityName);
		let entities = [];
		let findOptions: any = {};
		let useDefaultRepo = false;
		const queries = Object.keys(req.query);

		if (queries && queries.length) {
			let query = {};
			let attrs = [];
			for (let i = 0, len = queries.length; i < len; i++) {
				const key = queries[i];
				const value = <any>req.query[key];

				if (key === 'useDefaultRepo') {
					useDefaultRepo = true;
				} else if (key === 'attrs') {
					attrs = value.split(',');
				} else if (key.indexOf('.') >= 0) {
					const splitProp = key.split('.');
					const prop = splitProp[0],
						subProp = splitProp[1];
					query[prop] = {};
					query[prop][subProp] = transformQueryValue(value);
				} else {
					query[key] = transformQueryValue(value);
				}
			}

			findOptions = {};
			if (query) {
				findOptions.where = query;
			}
			if (attrs && attrs.length) {
				findOptions.select = attrs;
			}
		}

		if (model.repoType && !useDefaultRepo) {
			const manager = getManager();
			switch (model.repoType) {
				case 'tree':
					entities = await manager.getTreeRepository(entityName).findTrees();
					break;
				default:
					entities = await repo.find(findOptions);
					break;
			}
		} else {
			entities = await repo.find(findOptions);
		}

		if (model && model.relationships && model.relationships.length) {
			await loadRelationships(entityName, repo, model.relationships, entities);
		}

		removeIgnoredAttrs(entities);

		console.log(
			`GET: ${entityName}${
				Object.keys(req.query).length ? ' ' + JSON.stringify(req.query) : ''
			} | Returned ${entities.length} entities! USER: ${userJwt.username}`
		);

		res.send(entities);
	} catch (e) {
		res.status(500).send(e);
		console.error(
			`GET FAILED: ${entityName} ${JSON.stringify(req.query)} | USER: ${userJwt.username}`
		);
		console.error(`ERROR: `, e);
	}
};

const transformQueryValue = (value: string) => {
	const lowerValue = value.toLowerCase();
	if (lowerValue === 'null') {
		return IsNull();
	} else {
		return value;
	}
};

const removeIgnoredAttrs = (entities: any[]) => {
	if (!entities) return;
	const ignoreAttrs = ['relationships', 'loadAfterCreate'];
	(entities instanceof Array ? entities : [entities]).forEach((e) =>
		ignoreAttrs.forEach((attr) => delete e[attr])
	);
};

const loadRelationships = async (
	entityName: string,
	repo: Repository<any>,
	relationships: any[],
	baseEntities?: any[],
	ignoreSubRelations?: boolean
) => {
	if (!baseEntities || !baseEntities.length) return;

	// Wait for all sub finds to complete and spread them into a res object
	const { ...res } = await Promise.all(
		relationships.map((relation) => {
			const manager = getManager();
			if (relation.model && relation.model.repoType && !relation.useDefaultRepo) {
				switch (relation.model.repoType) {
					case 'tree':
						return manager.getTreeRepository(entityName).findTrees();
						break;
					default:
						return repo.findByIds(
							baseEntities.map((entity) => {
								if (!entity || !entity.id) return;
								return entity.id;
							}),
							{
								select: ['id'],
								relations: [relation.name]
							}
						);
						break;
				}
			} else {
				return repo.findByIds(
					baseEntities.map((entity) => {
						if (!entity || !entity.id) return;
						return entity.id;
					}),
					{
						select: ['id'],
						relations: [relation.name]
					}
				);
			}
		})
	);

	// Loop over every sub find result, find the "full entity" we're trying to build from our base entities,
	// and attach the corresponding related entites to it (not a "pure" function)
	const subRelationshipPromises = [];

	for (const i of Object.keys(res)) {
		for (const r of res[i]) {
			const fullEntity = baseEntities.find((e) => e.id === r.id);
			if (fullEntity) {
				const relationName = relationships[i].name;
				const relationObject = r[relationName];

				if (
					relationships[i].model &&
					relationships[i].model.relationships &&
					!ignoreSubRelations
				) {
					const subRepo = Database._connection.getRepository(
						relationships[i].model.displayName
					);
					const subRelationships = relationships[i].model.relationships;
					subRelationshipPromises.push(
						loadRelationships(
							entityName,
							subRepo,
							subRelationships,
							relationObject instanceof Array ? relationObject : [relationObject],
							relationships[i].ignoreSubRelations
						)
					);
				}

				removeIgnoredAttrs(relationObject);
				removeIgnoredAttrs(fullEntity);
				fullEntity[relationName] = relationObject;
			}
		}
	}

	await Promise.all(subRelationshipPromises);
};
