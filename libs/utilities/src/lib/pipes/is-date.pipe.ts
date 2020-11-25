import { Pipe, PipeTransform } from '@angular/core';

import { isDate } from './../utilities/dates/isDate';

@Pipe({ name: 'isDate' })
export class IsDatePipe implements PipeTransform {
	transform(value: any) {
		return isDate(value);
	}
}
