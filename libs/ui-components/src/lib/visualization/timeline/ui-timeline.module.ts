import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TieredMenuModule } from 'primeng/tieredmenu';

import { UIVisualizationModule } from '../ui-visualization.module';
import { UITimelineComponent } from './ui-timeline.component';

@NgModule({
	declarations: [UITimelineComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		UIVisualizationModule,

		ButtonModule,
		DropdownModule,
		TieredMenuModule
	],
	exports: [UITimelineComponent],
	providers: []
})
export class UITimelineModule {}
