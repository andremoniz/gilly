import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { EntityFieldConfig } from './../../../../../../entities/entity-field-config';
import { handleFieldVisibility } from './../configurators/ui-field-visibility';
import { UIFieldConfig } from './../ui-field.base';

@Component({
	selector: 'ui-field-wrapper',
	template: `
		<div class="ui-field-container p-field" *ngIf="field.visible">
			<label class="ui-field-label" *ngIf="field.type !== 'label' && field.type !== 'table'"
				>{{ field.label || field.key | prettyPrint }}
			</label>

			<ng-container dynamicField [config]="config"></ng-container>

			<p-message
				severity="error"
				[text]="(field.label || field.key | prettyPrint) + ' is required.'"
				*ngIf="
					config.field.required &&
					(config.control.dirty || config.control.touched) &&
					config.control.invalid
				"
			></p-message>
		</div>
	`,
	styles: [
		`
			.ui-field-container {
			}

			.ui-field-label {
			}
		`
	]
})
export class UIFieldWrapperComponent implements OnInit {
	private _config: UIFieldConfig;
	@Input()
	set config(c: UIFieldConfig) {
		this._config = c;
	}
	get config(): UIFieldConfig {
		return this._config;
	}
	get field(): EntityFieldConfig {
		return this.config.field;
	}
	get control(): FormControl | FormArray {
		return this.config.control;
	}
	get group(): FormGroup {
		return this.config.group;
	}

	constructor() {}

	ngOnInit(): void {}
}
