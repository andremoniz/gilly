import { Pipe, PipeTransform } from '@angular/core';

import { FilterSortService } from './../services/filter-sort.service';

@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {
	constructor(private fs: FilterSortService) {}

	transform(
		array: any[],
		query: string,
		searchProp?: string,
		excludeProps?: string | string[],
		dateFormat?: string
	) {
		return this.fs.search(array, query, searchProp, excludeProps, dateFormat);
	}
}
