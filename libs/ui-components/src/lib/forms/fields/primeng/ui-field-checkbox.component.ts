import { Component, Input, OnInit } from '@angular/core';

import { UIFieldBase, UIFieldConfig } from './../ui-field.base';

@Component({
	selector: 'ui-field-text',
	template: `
		<div class="p-field-checkbox">
			<p-checkbox [formControl]="config.control"></p-checkbox>
			<label [for]="config.field.key">{{ config.field.label || config.field.key }}</label>
		</div>
	`,
	styles: [``]
})
export class UIFieldCheckboxPrimeNGComponent extends UIFieldBase implements OnInit {
	constructor() {
		super();
	}

	ngOnInit(): void {}
}
