import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { deepClone } from '../../../../../../utilities/src/lib/utilities/deepClone';

import { FilterSortService } from './../../../../../../utilities/src/lib/services/filter-sort.service';
import { UIFieldBase, UIFieldConfig } from './../ui-field.base';

@Component({
	selector: 'ui-field-autocomplete',
	template: `
		<p-autoComplete
			[formControl]="control"
			[suggestions]="results | async"
			[dropdown]="true"
			(completeMethod)="search($event)"
		></p-autoComplete>
	`,
	styles: [``]
})
export class UIFieldAutocompletePrimeNGComponent extends UIFieldBase implements OnInit {
	results: any[] | Observable<any[]>;

	_config: UIFieldConfig;
	@Input()
	set config(c: UIFieldConfig) {
		this._config = c;
	}
	get config(): UIFieldConfig {
		return this._config;
	}

	constructor(private fs: FilterSortService) {
		super();
	}

	ngOnInit(): void {
		this.results = this.field.options;
	}

	search(event) {
		// this.results = this.fs.filter(this.field.options.valueOf, 'label', event.query);
	}
}
