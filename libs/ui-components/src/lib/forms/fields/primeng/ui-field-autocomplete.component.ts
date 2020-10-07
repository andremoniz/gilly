import { Component, Input, OnInit } from '@angular/core';

import { FilterSortService } from './../../../../../../utilities/src/lib/services/filter-sort.service';
import { UIFieldBase, UIFieldConfig } from './../ui-field.base';

@Component({
	selector: 'ui-field-autocomplete',
	template: `
		<p-autoComplete
			[formControl]="config.control"
			[suggestions]="results"
			(completeMethod)="search($event)"
		></p-autoComplete>
	`,
	styles: [``]
})
export class UIFieldAutocompletePrimeNGComponent extends UIFieldBase implements OnInit {
	results: { label: string; value: any }[];

	_config: UIFieldConfig;
	@Input()
	set config(c: UIFieldConfig) {
		this._config = c;

		this.results = c.field.options;
	}
	get config(): UIFieldConfig {
		return this._config;
	}

	constructor(private fs: FilterSortService) {
		super();
	}

	ngOnInit(): void {}

	search(event) {
		this.results = this.fs.filter(this.config.field.options, 'label', event.query);
	}
}
