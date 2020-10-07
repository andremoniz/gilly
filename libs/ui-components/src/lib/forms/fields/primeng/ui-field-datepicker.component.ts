import { Component, Input, OnInit } from '@angular/core';

import { UIFieldBase, UIFieldConfig } from './../ui-field.base';

@Component({
	selector: 'ui-field-datepicker',
	template: `
		<p-calendar
			[formControl]="config.control"
			[showIcon]="true"
			[monthNavigator]="true"
			[yearNavigator]="true"
			yearRange="1950:2030"
			[showTime]="true"
			[showButtonBar]="true"
		></p-calendar>
	`,
	styles: [``]
})
export class UIFieldDatepickerPrimeNGComponent extends UIFieldBase implements OnInit {
	constructor() {
		super();
	}

	ngOnInit(): void {}
}
