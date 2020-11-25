import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';

import { UtilityPipesModule } from '../../../../../utilities/src/lib/pipes/utility-pipes.module';
import { UIVisualizationModule } from '../ui-visualization.module';
import { UITableComponent } from './ui-table.component';

@NgModule({
	declarations: [UITableComponent],
	imports: [
		CommonModule,
		FormsModule,
		
		UIVisualizationModule,

		TableModule,
		InputTextModule,
		CalendarModule,
		DropdownModule,
		MultiSelectModule,

		UtilityPipesModule
	],
	exports: [UITableComponent],
	providers: [DynamicDialogConfig, DynamicDialogRef],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UITableModule {}
