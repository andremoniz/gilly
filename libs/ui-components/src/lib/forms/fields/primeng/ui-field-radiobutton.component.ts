import { Component, Input, OnInit } from '@angular/core';

import { UIFieldBase, UIFieldConfig } from './../ui-field.base';

@Component({
	selector: 'ui-field-radiobutton',
	template: `
		<div class="p-field-radiobutton" *ngFor="let option of config.field.options">
			<p-radioButton
				[formControl]="config.control"
				[value]="option.value"
			></p-radioButton>
			<label [for]="config.field.key">{{ option.label }}</label>
		</div>
	`,
	styles: [``]
})
export class UIFieldRadioButtonPrimeNGComponent extends UIFieldBase implements OnInit {
	constructor() {
		super();
	}

	ngOnInit(): void {}
}
