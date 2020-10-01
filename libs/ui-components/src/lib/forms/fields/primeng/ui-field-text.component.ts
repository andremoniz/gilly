import { Component, OnInit } from '@angular/core';

import { UIFieldBase } from './../ui-field.base';

@Component({
	selector: 'ui-field-text',
	template: ` <input type="text" pInputText [formControl]="config.control" /> `,
	styles: [``]
})
export class UIFieldTextPrimeNGComponent extends UIFieldBase implements OnInit {
	constructor() {
		super();
	}

	ngOnInit(): void {}
}
