import { Component } from '@angular/core';

import { UIFieldBase } from '../ui-field.base';

@Component({
	selector: 'ui-field-label',
	template: `<h5 class="w-100 p-2 bg-dark text-white mt-3 mb-1">{{ config.field.label }}</h5> `,
	styles: [``]
})
export class UIFieldLabelPrimeNGComponent extends UIFieldBase {
	constructor() {
		super();
	}
}
