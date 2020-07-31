import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { DataService } from './data.service';

enum Action {
	CREATE = 'Create',
	UPDATE = 'Update',
	BULK = 'Bulk',
	DELETE = 'Delete'
}

@Injectable()
export class DataSave {
	private DS: DataService;

	constructor(private http: HttpClient) {}

	setDataService(ds: DataService) {
		this.DS = ds;
	}

	/**
	 * Save an object to the database; saving will determine if the object is new (doesn't have an id) or needs to be updated. This will determine whether or not to POST or PATCH the object.
	 * It will also detect if the incoming objToSave is an array, indicating we have a bulk update scenario, so it will split this into a create and update call with array.
	 * Special care needs to be taken to ensure the front end object receives the new id from the backend
	 * @param model The interface / class to construct the query against and build response objects from
	 * @param objToSave The front end object to be saved
	 * @param originalEntities If included, will compare against the objToSave to determine what might need to be deleted
	 * @param handleDeletes If true, will also compare to original entities to determine what needs to be deleted
	 */
	save<T>(
		model: T | any,
		objToSave: T | T[] | any | any[],
		originalEntities?: T[] | any[] | any,
		handleDeletes?: boolean
	): Observable<T | any> {
		const url = `${this.DS.apiEndpoint}/${this.DS.getModelName(model)}${
			objToSave.id ? '/' + objToSave.id : ''
		}`;

		if (Array.isArray(objToSave)) {
			// BULK SAVE
			objToSave.forEach((o, i) => (o._saveId = i));

			const toCreate = [],
				toUpdate = [];
			let toDelete = [];

			if (originalEntities && handleDeletes) {
				// compare objToSave against this to determine what we might need to delete
				const toKeepIds = objToSave.map((o) => o.id);
				toDelete = originalEntities.filter((e) => !toKeepIds.includes(e.id));
			}

			objToSave.forEach((o) => {
				o.id ? toUpdate.push(o) : toCreate.push(o);
			});

			const httpObs = [];
			if (toCreate.length) {
				httpObs.push(this.http.post(url, toCreate).pipe());
			}
			if (toUpdate.length) {
				httpObs.push(this.http.put(url, toUpdate).pipe());
			}
			if (toDelete.length) {
				httpObs.push(this.http.request('delete', url, { body: toDelete }).pipe());
			}

			return forkJoin(httpObs).pipe(
				map((res: T[] | any[] | any) => {
					return [].concat.apply([], res); // combined all creates, updates and deletes into one result
				}),
				map((res: T[] | any[] | any) => {
					(res.results || res || []).forEach((o) => {
						const objIdSet = objToSave.find((os) => os._saveId === o._saveId);
						if (objIdSet) objIdSet.id = o.id;
					});

					objToSave.forEach((o) => delete o._saveId);

					this.cacheAndNotifySaved(
						model,
						[
							...objToSave,
							...toDelete.map((td) =>
								Object.assign({}, td, { METHOD: Action.DELETE })
							)
						],
						Action.BULK
					);
					return objToSave;
				})
			);
		} else {
			if (objToSave && objToSave.id) {
				return this.http.put(url, objToSave).pipe(
					tap((res: T | any) => {
						Object.assign(objToSave, res);
						this.cacheAndNotifySaved(model, objToSave, Action.UPDATE);
						return res;
					})
				);
			} else {
				return this.http.post(url, objToSave).pipe(
					tap((res: T | any) => {
						Object.assign(objToSave, res);
						this.cacheAndNotifySaved(model, objToSave, Action.CREATE);
						return res;
					})
				);
			}
		}
	}

	private cacheAndNotifySaved<T>(model: T | any, newModelObj, action: Action) {
		switch (action) {
			case Action.CREATE:
				// Append the new object into the front end cache
				this.DS.cache[this.DS.getModelName(model)].push({ ...newModelObj });
				break;
			case Action.UPDATE:
				// Update the object in the front end cache
				this.DS.cache[this.DS.getModelName(model)] = this.DS.cache[
					this.DS.getModelName(model)
				].map((entity) => {
					if (entity.id === newModelObj.id) {
						return newModelObj;
					} else {
						return entity;
					}
				});
				break;
			case Action.BULK:
				newModelObj.forEach((newObj) => {
					if (newObj.METHOD === Action.DELETE) {
						this.DS.cache[this.DS.getModelName(model)] = this.DS.cache[
							this.DS.getModelName(model)
						].filter((d) => d.id !== newObj.id);
					} else {
						const updateObj = this.DS.cache[this.DS.getModelName(model)].find(
							(o) => o.id === newObj.id
						);
						if (updateObj) {
							Object.assign(updateObj, newObj);
						} else {
							this.DS.cache[this.DS.getModelName(model)].push({ ...newObj });
						}
					}
				});
				break;
			default:
				break;
		}

		this.DS.subjectMap[this.DS.getModelName(model)].next(
			this.DS.cache[this.DS.getModelName(model)]
		);
		this.DS.loadingMap[this.DS.getModelName(model)].next(false);
	}
}
