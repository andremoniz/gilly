import { Directive, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { EntityFieldConfig } from './../../../../../entities/base';

export interface UIFieldConfig {
	field: EntityFieldConfig;
	control: FormControl;
}

@Directive()
export abstract class UIFieldBase {
	_config: UIFieldConfig;
	@Input()
	set config(c: UIFieldConfig) {
		this._config = c;
	}
	get config(): UIFieldConfig {
		return this._config;
	}

	constructor() {}
}
