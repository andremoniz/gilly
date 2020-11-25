import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';

import { UtilityPipesModule } from './../../../../utilities/src/lib/pipes/utility-pipes.module';
import { UIFilterChipComponent } from './ui-filter-chip.component';
import { UIFilterMenuListComponent } from './ui-filter-menu-list.component';
import { UIFilterMenuComponent } from './ui-filter-menu.component';
import { UIFilterSortUniqueValuesPipe } from './ui-filter-sort-unique-values.pipe';
import { UIFilterComponent } from './ui-filter.component';
import { UIFilterService } from './ui-filter.service';

@NgModule({
	declarations: [
		UIFilterComponent,
		UIFilterMenuComponent,
		UIFilterMenuListComponent,
		UIFilterChipComponent,
		UIFilterSortUniqueValuesPipe
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,

		InputTextModule,
		ButtonModule,
		SelectButtonModule,
		CalendarModule,
		CheckboxModule,

		UtilityPipesModule
	],
	exports: [UIFilterComponent],
	providers: [UIFilterService, DialogService]
})
export class UIFilterModule {}
