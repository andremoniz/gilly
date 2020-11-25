import { Component, Input, OnInit } from '@angular/core';

import { UIFieldBase, UIFieldConfig } from './../ui-field.base';

@Component({
	selector: 'ui-field-colorpicker',
	template: ` <p-colorPicker appendTo="body" [formControl]="config.control"></p-colorPicker> `,
	styles: [``]
})
export class UIFieldColorPickerPrimeNGComponent extends UIFieldBase implements OnInit {
	constructor() {
		super();
	}

	ngOnInit(): void {}
}
