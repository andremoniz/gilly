import { Pipe, PipeTransform } from '@angular/core';
import { pickTextcolorBasedOnBackgroundColor } from '../utilities/colors/pickTextColorBasedOnBackgroundColor';

@Pipe({ name: 'pickTextColorBasedOnBackgroundColor' })
export class PickTextColorBasedOnBackgroundColorPipe implements PipeTransform {
	transform(value, lightColor?, darkColor?) {
		return pickTextcolorBasedOnBackgroundColor(value, lightColor, darkColor);
	}
}
