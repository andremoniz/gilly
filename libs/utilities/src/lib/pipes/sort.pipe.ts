import { Pipe, PipeTransform } from '@angular/core';

import { FilterSortService } from './../services/filter-sort.service';

@Pipe({ name: 'sort' })
export class SortPipe implements PipeTransform {
	constructor(private fs: FilterSortService) {}

	transform(
		array: any[],
		prop: string,
		options: { reverse?: boolean; isDate?: boolean; isNumber?: boolean } = {}
	) {
		return this.fs.sort(array, prop, options.reverse, options.isDate, options.isNumber);
	}
}
