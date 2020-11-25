import { Component, OnInit } from '@angular/core';

import { UIFieldBase } from './../ui-field.base';

@Component({
	selector: 'ui-field-text',
	template: `
		<div class="p-field-checkbox">
			<p-checkbox [formControl]="config.control" binary="true"></p-checkbox>
		</div>
	`,
	styles: [``]
})
export class UIFieldCheckboxPrimeNGComponent extends UIFieldBase implements OnInit {
	constructor() {
		super();
	}

	ngOnInit(): void {}
}
