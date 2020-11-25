import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { UIFieldMultiselectsBase } from '../ui-field-multiselects.base';

@Component({
	selector: 'ui-field-listbox',
	template: `
		<p-multiSelect
			appendTo="body"
			[(ngModel)]="source"
			[options]="field.options | async"
			[optionLabel]="field.labelProp || 'label'"
			[scrollHeight]="'300px'"
			[maxSelectedLabels]="5"
			(onChange)="handleMultiSelectChange($event)"
		></p-multiSelect>
	`,
	styles: [``]
})
export class UIFieldMultiSelectPrimeNGComponent extends UIFieldMultiselectsBase implements OnInit {
	constructor() {
		super();
	}

	ngOnInit(): void {
		this.source = this.generateValuesFromControl();
	}

	handleMultiSelectChange(event) {
		this.updateControlValues(this.source, true);
	}
}
