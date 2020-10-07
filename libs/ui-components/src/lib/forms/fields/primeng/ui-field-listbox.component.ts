import { Component, Input, OnInit } from '@angular/core';

import { UIFieldBase, UIFieldConfig } from './../ui-field.base';

@Component({
	selector: 'ui-field-listbox',
	template: `
		<p-listbox
			[formControl]="config.control"
			[options]="config.field.options"
			[optionLabel]="config.field.optionLabel || 'label'"
		></p-listbox>
	`,
	styles: [``]
})
export class UIFieldListboxPrimeNGComponent extends UIFieldBase implements OnInit {
	constructor() {
		super();
	}

	ngOnInit(): void {}
}
