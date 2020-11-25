import { Pipe, PipeTransform } from '@angular/core';

import { FilterSortService } from '../services/filter-sort.service';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
	constructor(private fs: FilterSortService) {}

	transform(array: any[], searchProp: string, query: any) {
		return this.fs.filter(array, searchProp, query);
	}
}
