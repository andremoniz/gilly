import { MapifyPipe } from './mapify.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GetColorForPercentagePipe } from './color-getColorForPercentage.pipe';
import { PickTextColorBasedOnBackgroundColorPipe } from './color-pickTextColorBasedOnBackgroundColor.pipe';
import { FilterPipe } from './filter.pipe';
import { IsArrayPipe } from './is-array.pipe';
import { IsDatePipe } from './is-date.pipe';
import { ObjectKeysPipe } from './loop-object-keys.pipe';
import { PrettyPrintDaterangePipe } from './pretty-print-daterange';
import { PrettyPrintPipe } from './pretty-print.pipe';
import { SearchPipe } from './search.pipe';
import { SortPipe } from './sort.pipe';

@NgModule({
	declarations: [
		FilterPipe,
		IsArrayPipe,
		IsDatePipe,
		ObjectKeysPipe,
		PrettyPrintDaterangePipe,
		PrettyPrintPipe,
		SearchPipe,
		SortPipe,
		PickTextColorBasedOnBackgroundColorPipe,
		GetColorForPercentagePipe,
		MapifyPipe
	],
	imports: [CommonModule],
	exports: [
		FilterPipe,
		IsArrayPipe,
		IsDatePipe,
		ObjectKeysPipe,
		PrettyPrintDaterangePipe,
		PrettyPrintPipe,
		SearchPipe,
		SortPipe,
		PickTextColorBasedOnBackgroundColorPipe,
		GetColorForPercentagePipe,
		MapifyPipe
	]
})
export class UtilityPipesModule {}
