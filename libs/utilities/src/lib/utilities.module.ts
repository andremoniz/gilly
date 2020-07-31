import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FilterSortService } from './services/filter-sort.service';
import { UtilityService } from './services/utility.service';

@NgModule({
	imports: [CommonModule],
	providers: [FilterSortService, UtilityService]
})
export class UtilitiesModule {}
