import { Pipe, PipeTransform } from '@angular/core';

import { getColorForPercentage } from '../utilities/colors/getColorForPercentage';

@Pipe({ name: 'getColorForPercentage' })
export class GetColorForPercentagePipe implements PipeTransform {
	transform(value) {
		return getColorForPercentage(value);
	}
}
