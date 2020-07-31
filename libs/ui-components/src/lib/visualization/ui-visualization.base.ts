import { Observable, Subscription } from 'rxjs';
import { ChangeDetectorRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { isObservable, Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';

export abstract class UIVisualizationBase implements OnDestroy {
	configLoaded$ = new Subject<UIVisualizationConfig>();
	displayOptionsLoaded$ = new Subject<any>();

	viewDimensions: UIDimension;
	config: UIVisualizationConfig;

	data$: Subscription;

	_data: any[];
	@Input()
	set data(d) {
		if (isObservable(d)) {
			this.data$ = d
				.pipe(
					tap((res: any[]) => {
						this._data = res;
						this.emitConfigLoaded();
					})
				)
				.subscribe();
		} else {
			this._data = d || [];
			this.emitConfigLoaded();
		}
	}
	get data(): any[] {
		return this._data;
	}

	_displayOptions: any;
	@Input()
	set displayOptions(displayOptions: any) {
		this._displayOptions = displayOptions;
		this.displayOptionsLoaded$.next(this.displayOptions);
		this.emitConfigLoaded();
	}
	get displayOptions(): any {
		return this._displayOptions;
	}

	@Output() itemClicked = new EventEmitter<any>();
	@Output() itemMetaClicked = new EventEmitter<{ data: any; meta: any }>();
	@Output() groupClicked = new EventEmitter<any>();

	constructor(public cdRef: ChangeDetectorRef) {}

	ngOnDestroy() {
		this.configLoaded$.complete();

		if (this.data$) {
			this.data$.unsubscribe();
		}
	}

	handleDimensionChange(dimension: UIDimension) {
		this.viewDimensions = dimension;
		this.cdRef.detectChanges();
	}

	emitConfigLoaded() {
		if (!this.data || !this.displayOptions) return;
		this.config = { data: this.data, displayOptions: this.displayOptions };
		this.configLoaded$.next(this.config);
		this.cdRef.detectChanges();
	}

	handleGroupSelected(filterProp: string, filterValue: string) {
		this.groupClicked.emit(
			this.config.data.filter(
				(d) => d[filterProp] === (filterValue === 'None' ? null : filterValue)
			)
		);
	}
}

export interface UIDimension {
	height: number;
	width: number;
}

export interface UIVisualizationConfig {
	data?: any[];
	displayOptions?: any;
}
