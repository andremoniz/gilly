import { Component, Input, OnInit } from '@angular/core';

import { UIFieldBase, UIFieldConfig } from './../ui-field.base';

@Component({
	selector: 'ui-field-text',
	template: ` <p-inputNumber [formControl]="config.control"></p-inputNumber> `,
	styles: [``]
})
export class UIFieldNumberPrimeNGComponent extends UIFieldBase implements OnInit {
	constructor() {
		super();
	}

	ngOnInit(): void {}
}
