import { Pipe, PipeTransform } from '@angular/core';
import { mapifyGroup } from '../utilities/arrays/mapifyGroup';

@Pipe({ name: 'mapify' })
export class MapifyPipe implements PipeTransform {
	transform(values: any[], prop: string): { [prop: string]: any[] } {
		return mapifyGroup(values, prop);
	}
}
