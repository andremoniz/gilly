import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'prettyPrintDaterange' })
export class PrettyPrintDaterangePipe implements PipeTransform {
	constructor(private datePipe: DatePipe) {}

	transform(value: Date[]) {
		return value.map((date) => this.datePipe.transform(date, 'shortDate')).join(' to ');
	}
}
