import { Component, OnInit } from '@angular/core';

import { UIFieldMultiselectsBase } from '../ui-field-multiselects.base';

@Component({
	selector: 'ui-field-listbox',
	template: `
		<p-listbox
			[(ngModel)]="source"
			[options]="field.options | async"
			[optionLabel]="field.labelProp || 'label'"
			[optionValue]="field.valueProp || 'value'"
			[filter]="true"
			[checkbox]="true"
			[multiple]="true"
			(onChange)="handleListboxChange($event)"
		></p-listbox>
	`,
	styles: [``]
})
export class UIFieldListboxPrimeNGComponent extends UIFieldMultiselectsBase implements OnInit {
	constructor() {
		super();
	}

	ngOnInit(): void {
		this.source = this.generateValuesFromControl();
	}

	handleListboxChange(event) {
		this.updateControlValues(this.source, true);
	}
}
