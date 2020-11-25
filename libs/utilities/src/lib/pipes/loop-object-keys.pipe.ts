import { Pipe, PipeTransform } from '@angular/core';

import { FilterSortService } from './../services/filter-sort.service';

@Pipe({ name: 'objectKeys' })
export class ObjectKeysPipe implements PipeTransform {
	constructor(private fs: FilterSortService) {}

	transform(obj: any, sort?: boolean) {
		const keys = sort ? Object.keys(obj).sort() : Object.keys(obj);
		return keys;
	}
}
