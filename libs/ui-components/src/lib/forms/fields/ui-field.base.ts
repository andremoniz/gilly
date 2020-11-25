import { Input, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

import { EntityFieldConfig } from './../../../../../entities/entity-field-config';
import { setupFieldOptions } from './configurators/ui-field-options';

export interface UIFieldConfig {
	field: EntityFieldConfig;
	control: FormControl & FormArray;
	group?: FormGroup;
}

export const dateFieldTypes = ['date', 'datepicker', 'datetime', 'daterange'];
export const colorFieldTypes = ['colorpicker', 'color'];
export const arrayFieldTypes = [
	'array',
	'table',
	'selectmultiple',
	'multiselect',
	'picklist',
	'listbox',
	'orderlist'
];
export const selectFieldTypes = [
	'select',
	'autocomplete',
	'multiselect',
	'picklist',
	'listbox',
	'orderlist'
];

export abstract class UIFieldBase implements OnDestroy {
	unsubscribe: Subject<any> = new Subject<void>();
	configLoaded$ = new Subject();

	_config: UIFieldConfig;
	@Input()
	set config(c: UIFieldConfig) {
		this._config = c;

		if (selectFieldTypes.includes(this.field.type)) {
			this.field = {
				...this.field,
				options: setupFieldOptions(this.field)
			};
		}

		this.configLoaded$.next(c);
	}
	get config(): UIFieldConfig {
		return this._config;
	}
	set field(f: EntityFieldConfig) {
		this.config.field = f;
	}
	get field(): EntityFieldConfig {
		return this.config.field;
	}
	set control(c: FormControl & FormArray) {
		this.config.control = c;
	}
	get control(): FormControl & FormArray {
		return this.config.control;
	}
	get group(): FormGroup {
		return this.config.group;
	}

	constructor() {}

	ngOnInit() {}

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
}
