import { Component, Input, OnInit } from '@angular/core';

import { UIFieldBase, UIFieldConfig } from './../ui-field.base';

@Component({
	selector: 'ui-field-textarea',
	template: ` <textarea pInputTextarea [formControl]="config.control"></textarea> `,
	styles: [``]
})
export class UIFieldTextareaPrimeNGComponent extends UIFieldBase implements OnInit {
	constructor() {
		super();
	}

	ngOnInit(): void {}
}
