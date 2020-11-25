import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isArray' })
export class IsArrayPipe implements PipeTransform {
	transform(value: any[]) {
		return Array.isArray(value);
	}
}
