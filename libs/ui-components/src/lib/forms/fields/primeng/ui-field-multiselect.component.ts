import { Component, Input, OnInit } from '@angular/core';

import { UIFieldBase, UIFieldConfig } from './../ui-field.base';

@Component({
	selector: 'ui-field-listbox',
	template: `
		<p-multiSelect
			[formControl]="config.control"
			[options]="config.field.options"
			[optionLabel]="config.field.optionLabel || 'label'"
		></p-multiSelect>
	`,
	styles: [``]
})
export class UIFieldMultiSelectPrimeNGComponent extends UIFieldBase implements OnInit {
	constructor() {
		super();
	}

	ngOnInit(): void {}
}
