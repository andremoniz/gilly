import { Component, Input, OnInit } from '@angular/core';

import { UIFieldBase, UIFieldConfig } from './../ui-field.base';

@Component({
	selector: 'ui-field-select',
	template: `
		<p-dropdown
			[formControl]="config.control"
			[options]="config.field.options"
			[editable]="true"
			[showClear]="true"
		></p-dropdown>
	`,
	styles: [``]
})
export class UIFieldSelectPrimeNGComponent extends UIFieldBase implements OnInit {
	constructor() {
		super();
	}

	ngOnInit(): void {}
}
