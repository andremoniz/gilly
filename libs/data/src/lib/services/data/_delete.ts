import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { DataService } from './data.service';

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

		if (this.DS.isOptimistic) {
			this.cacheAndNotifyDelete(model, objToDelete);
		}

		const url = `${this.DS.apiEndpoint}/${this.DS.getModelName(model)}${
			Array.isArray(objToDelete) ? '' : '/' + objToDelete.id || objToDelete
		}`;

		return this.http
			.request<T[]>('delete', url, { body: objToDelete })
			.pipe(
				tap((res: T[]) => {
					if (!this.DS.isOptimistic) {
						this.cacheAndNotifyDelete(model, objToDelete);
					}
				})
			);
	}

	private cacheAndNotifyDelete<T>(model: T | any, objToDelete: T | any) {
		if (!this.DS.cache[this.DS.getModelName(model)]) return;

		// Remove the object to delete from the front end cache by filtering out everything that doesn't have the same id
		if (Array.isArray(objToDelete)) {
			const deleteIds = objToDelete.map((o) => o.id);
			this.DS.cache[this.DS.getModelName(model)] = this.DS.cache[
				this.DS.getModelName(model)
			].filter((el) => !deleteIds.includes(el.id));
		} else {
			this.DS.cache[this.DS.getModelName(model)] = this.DS.cache[
				this.DS.getModelName(model)
			].filter((el) => el.id !== (objToDelete.id || objToDelete));
		}

		this.DS.subjectMap[this.DS.getModelName(model)].next(
			this.DS.cache[this.DS.getModelName(model)]
		);
		this.DS.loadingMap[this.DS.getModelName(model)].next(false);
	}
}
