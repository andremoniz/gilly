import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sortUniqueValues' })
export class UIFilterSortUniqueValuesPipe implements PipeTransform {
	transform(
		values: {
			key: string;
			value: { count: number };
		}[],
		sortBy: 'abc' | 'count'
	): any[] {
		let sorted = values;

		if (sortBy === 'count') {
			return values.sort((a, b) => {
				const aVal = a.value.count,
					bVal = b.value.count;
				return aVal === bVal ? 0 : aVal > bVal ? -1 : 1;
			});
		} else {
			return sorted.sort((a, b) => {
				return a.key === b.key ? 0 : a.key > b.key ? 1 : -1;
			});
		}
	}
}
