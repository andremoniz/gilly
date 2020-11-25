import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { DataDelete } from './_delete';
import { DataRead } from './_read';
import { DataSave } from './_save';
import { DataServiceConfig } from './data-service.module';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	apiEndpoint: string;
	tables: any;

	// Determine whether or not to be optimstic with our Http calls in terms of updating the front end. True means update the front end right away despite what the server does.
	isOptimistic = true;

	// A simple object that is used a cache for any data that has been loaded into the system
	cache: CacheMap = {};
	// A map of TableName => Subject for external components to subscribe to, in order to be notified of updates to that table's data
	subjectMap: SubjectMap = {};
	// A map of TableName => any (model type) for external components to set and subscribe to get a selected entity
	activeMap: ActiveMap = {};
	// A map of TableName => Boolean to components to use for displaying a loading icon when that table's data is being loaded or modified
	loadingMap: LoadingMap = {};
	loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	loading: boolean = false;
	// A map of TableName => any to components to use for displaying a message when the table's data is finished loading or modified
	messageMap: MessageMap = {};
	completionMessage$: BehaviorSubject<CompletionMessage> = new BehaviorSubject<CompletionMessage>(
		null
	); // Notify any global listeners

	constructor(
		private DSV: DataSave,
		private DR: DataRead,
		private DD: DataDelete,
		@Inject('dsConfig') config: DataServiceConfig,
		@Optional() @Inject('config') appConfig: any
	) {
		this.DSV.setDataService(this);
		this.DR.setDataService(this);
		this.DD.setDataService(this);

		if (config) {
			this.setupDataService(config);
		}

		if (appConfig) {
			this.setupDataService(appConfig);
		}
	}

	private setupDataService(config: any) {
		this.apiEndpoint = config.apiEndpoint || config.dataEndpoint;
		this.tables = { ...config.tables };
		this.setupLocalProps();
	}

	private setupLocalProps() {
		try {
			// TODO: Figure out how to make a subject with the correct TS model based on the table name
			Object.keys(this.tables).forEach((table) => {
				this.addTableToLocalProps(table);
			});
		} catch (e) {
			console.error(`Tables in DataService was null!`, e);
		}
	}

	public addTableToLocalProps(table: any) {
		if (!table) return;
		this.loadingMap[table] = new BehaviorSubject<boolean>(false);
		this.cache[table] = [];
		this.subjectMap[table] = new BehaviorSubject<any>(null);
		this.activeMap[table] = new BehaviorSubject<any>(null);
		this.messageMap[table] = new BehaviorSubject<any>(null);
	}

	/**
	 * PUBLIC API
	 */
	public getModelName<T>(model: T | any) {
		let modelName;

		if (model && (model.displayName || model.name || model.tableName)) {
			if (model.displayName) {
				modelName = model.displayName;
			} else if (model.tableName) {
				modelName = model.tableName;
			} else {
				modelName = model.name;
			}
		} else {
			modelName = model;
		}

		if (!this.cache[modelName]) {
			// TODO: Make this better (auto setup undetected tables)
			this.addTableToLocalProps(modelName);
		}

		return modelName;
	}

	public setData<T>(model: T, entities: any[] = []) {
		this.cache[this.getModelName(model)] = [...entities];
		this.subjectMap[this.getModelName(model)].next(this.cache[this.getModelName(model)]);
	}

	public generateCompletionMessage<T>(
		model: T | any,
		method: HttpMethods,
		status: 'SUCCESS' | 'ERROR',
		extraMessage?: any
	): CompletionMessage {
		const modelName = this.getModelName(model);

		const methodVerb = status === 'SUCCESS' ? 'was successful' : 'failed';

		const getHumanMethodName = (method: string) => {
			switch (method) {
				case 'GET':
					return `loading`;
				case 'POST':
					return `creating`;
				case 'PATCH':
					return `saving`;
				case 'PUT':
					return `saving`;
				case 'DELETE':
					return `deleting`;
				default:
					return `do something...`;
			}
		};

		const message = `${modelName} ${methodVerb} in ${getHumanMethodName(method)}!${
			extraMessage ? '\n\n' + extraMessage : ''
		}`;
		const messageObj: CompletionMessage = {
			severity: status.toLowerCase(),
			summary: status,
			detail: message
		};
		this.completionMessage$.next(messageObj);

		return messageObj;
	}

	// SAVE
	save<T>(
		model: T | any,
		objToSave?: T | any | T[] | any[],
		originalEntities?: T[] | any[] | any,
		handleDeletes?: boolean
	): Observable<T | T[]> {
		if (!model) return of();
		else return this.DSV.save(model, objToSave, originalEntities, handleDeletes);
	}

	// READ
	read<T>(
		model: T | any,
		query?: HttpParams | string | any,
		options?: { favorCache?: boolean }
	): Observable<T[]> {
		if (!model) return of();
		else if (options?.favorCache && this.cache[this.getModelName(model)]?.length)
			return of(this.cache[this.getModelName(model)]);
		else return this.DR.read(model, query);
	}

	readMulti<T>(models: T[] | any[]): Observable<any> {
		const obs = {};
		models.forEach((model) => {
			const modelName = this.getModelName(model);
			obs[modelName] = this.read(modelName);
		});

		this.loading = true;
		return forkJoin(obs).pipe(
			tap((res: any) => {
				this.loading = false;
			})
		);
	}

	readExternal(url, headers?): Observable<any> {
		return this.DR.readExternal(url, headers);
	}

	// DELETE
	delete<T>(model: T | any, objToDelete: T | any): Observable<T | T[]> {
		if (!model) return of();
		return this.DD.delete(model, objToDelete);
	}

	// SELECTORS
	selectAll<T>(model: T | any): Observable<T[]> {
		return this.subjectMap[this.getModelName(model)];
	}

	selectAllValues<T>(model: T | any): T[] {
		return this.cache[this.getModelName(model)];
	}

	selectFilter<T>(model: T | any, filterProp: string, filterValue: string): Observable<T | T[]> {
		return this.subjectMap[this.getModelName(model)].pipe(
			filter((o: any) => o[filterProp] === filterValue)
		);
	}

	selectOne<T>(model: T | any, id: string): Observable<T> {
		return of(this.selectOneValue(model, id));
	}

	selectOneValue<T>(model: T | any, id: any | string): T {
		return this.cache[this.getModelName(model)].find((entity) => entity.id === id);
	}

	// Active
	setActive<T>(model: T | any, entity?: any | string) {
		const activeValue = !entity
			? null
			: this.selectOneValue(model, entity.id ? entity.id : entity);

		this.activeMap[this.getModelName(model)].next(activeValue);
	}

	selectActive<T>(model: T | any): Observable<T> {
		return this.activeMap[this.getModelName(model)];
	}

	getActive<T>(model: T | any): T | any {
		return this.activeMap[this.getModelName(model)].getValue();
	}

	saveActive<T>(model: T | any): Observable<T | T[]> {
		return this.save(model, this.getActive(model));
	}

	deleteActive<T>(model: T | any) {
		return this.delete(model, this.getActive(model)).pipe(
			tap((entity) => this.setActive(model, null))
		);
	}

	// Loading
	selectLoading<T>(model: T | any): Observable<boolean> {
		return this.loadingMap[this.getModelName(model)];
	}

	isLoading<T>(model: T | any): boolean {
		return this.loadingMap[this.getModelName(model)].value;
	}

	// Messages
	selectMessage<T>(model: T | any): Observable<CompletionMessage> {
		return this.messageMap[this.getModelName(model)];
	}
}

/**
 * A simple cache that stores all recent entities for a table
 */
interface CacheMap {
	[tableName: string]: any[];
}

/**
 * A mapping of every environment defined DB table to a subject so that CRUD applications can send notifications to all subject subscribers
 */
interface SubjectMap {
	[tableName: string]: BehaviorSubject<any>;
}

/**
 * A mapping of a currently selected entity for each table
 */
interface ActiveMap {
	[tableName: string]: BehaviorSubject<any>;
}

/**
 * A mapping of every DB table to a load boolean so that external components can wait for a table's data to be loaded
 */
interface LoadingMap {
	[tableName: string]: BehaviorSubject<boolean>;
}

/**
 * A mapping of every DB table to a message so that external components can show a message on transaction completion
 */
interface MessageMap {
	[tableName: string]: BehaviorSubject<CompletionMessage>;
}

export interface CompletionMessage {
	severity?: string;
	summary?: string;
	detail: string;
}

export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * A simple cache which is an object whose properties is a table name with an array of that table's data loaded into the front end
 */
interface Cache {
	[tableName: string]: any[];
}

/**
 * An interface for what we expect to be used for dynamic Table CRUD
 */
interface TableCRUD {
	cache: Cache;
	subjectMap: SubjectMap;
	loadingMap: LoadingMap;
}
