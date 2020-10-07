import { Component, Input, OnInit } from '@angular/core';

import { prettyPrint } from './../../../../../../utilities/src/lib/utilities/strings/prettyPrint';
import { UIFieldConfig } from './../ui-field.base';

@Component({
	selector: 'ui-field-wrapper',
	template: `
		<div class="ui-field-container p-field">
			<label class="ui-field-label">{{ prettyLabel }}</label>

			<ng-container dynamicField [config]="config"></ng-container>

			<p-message
				severity="error"
				[text]="config.field.label + ' is required.'"
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
	_config: UIFieldConfig;
	@Input()
	set config(c: UIFieldConfig) {
		this._config = c;

		this.prettyLabel = this.generateLabel(c.field.label || c.field.key);
	}
	get config(): UIFieldConfig {
		return this._config;
	}

	prettyLabel: string;

	constructor() {}

	ngOnInit(): void {}

	generateLabel(label: string): string {
		return prettyPrint(label);
	}
}
