import { Component, OnInit } from '@angular/core';

import { UIFieldBase } from './../ui-field.base';

@Component({
	selector: 'ui-field-icon-input',
	template: `
		<input class="w-75" type="text" pInputText [formControl]="config.control" />
		<img class="p-ml-3" [src]="config.control.value" height="32" width="32" alt="" />
	`,
	styles: [``]
})
export class UIFieldIconInputPrimeNGComponent extends UIFieldBase implements OnInit {
	constructor() {
		super();
	}

	ngOnInit(): void {}
}
