import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { DataService } from './data.service';
import { GenericModelHttpParams } from './interceptors/GenericModelHttpParams';

@Injectable()
export class DataDelete {
	private DS: DataService;

	constructor(private http: HttpClient) {}

	setDataService(ds: DataService) {
		this.DS = ds;
	}

	/**
	 * Delete a front end object(s) from the database
	 * @param model The interface / class to construct the query against and build response objects from
	 * @param objToDelete The front end object to be deleted in the DB
	 */
	delete<T>(model: T | any, objToDelete: T | any): Observable<T[]> {
		if (!objToDelete) return;

		const modelName = this.DS.getModelName(model);

		if (this.DS.isOptimistic) {
			this.cacheAndNotifyDelete(model, objToDelete);
		}

		const url = `${this.DS.apiEndpoint}/${modelName}${
			Array.isArray(objToDelete) ? '' : '/' + objToDelete.id || objToDelete
		}`;

		return this.http
			.request<T[]>('delete', url, {
				body: objToDelete,
				params: new GenericModelHttpParams(modelName)
			})
			.pipe(
				tap((res: T[]) => {
					if (!this.DS.isOptimistic) {
						this.cacheAndNotifyDelete(model, objToDelete);
					}
				})
			);
	}

	private cacheAndNotifyDelete<T>(model: T | any, objToDelete: T | any) {
		const modelName = this.DS.getModelName(model);

		if (!this.DS.cache[modelName]) return;

		// Remove the object to delete from the front end cache by filtering out everything that doesn't have the same id
		if (Array.isArray(objToDelete)) {
			const deleteIds = objToDelete.map((o) => o.id);
			this.DS.cache[modelName] = this.DS.cache[modelName].filter(
				(el) => !deleteIds.includes(el.id)
			);
		} else {
			this.DS.cache[modelName] = this.DS.cache[modelName].filter(
				(el) => el.id !== (objToDelete.id || objToDelete)
			);
		}

		this.DS.subjectMap[modelName].next(this.DS.cache[modelName]);

		if (this.DS.getActive(model) && this.DS.getActive(model).id === objToDelete.id) {
			this.DS.setActive(model, null);
		}
	}
}
