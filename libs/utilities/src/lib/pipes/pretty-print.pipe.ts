import { Pipe, PipeTransform } from '@angular/core';

import { prettyPrint } from '../utilities/strings/prettyPrint';

@Pipe({ name: 'prettyPrint' })
export class PrettyPrintPipe implements PipeTransform {
	transform(value: string) {
		return prettyPrint(value);
	}
}
