import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularGanttScheduleTimelineCalendarModule } from 'angular-gantt-schedule-timeline-calendar';

import { UIVisualizationModule } from '../ui-visualization.module';
import { UITimelineComponent } from './ui-timeline.component';

@NgModule({
	declarations: [UITimelineComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		UIVisualizationModule,
		AngularGanttScheduleTimelineCalendarModule
	],
	exports: [UITimelineComponent],
	providers: []
})
export class UITimelineModule {}
