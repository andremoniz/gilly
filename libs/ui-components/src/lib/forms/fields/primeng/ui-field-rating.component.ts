import { Component, Input, OnInit } from '@angular/core';

import { UIFieldBase, UIFieldConfig } from './../ui-field.base';

@Component({
	selector: 'ui-field-rating',
	template: ` <p-rating [formControl]="config.control"></p-rating> `,
	styles: [``]
})
export class UIFieldRatingPrimeNGComponent extends UIFieldBase implements OnInit {
	constructor() {
		super();
	}

	ngOnInit(): void {}
}
