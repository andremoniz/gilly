import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularGanttScheduleTimelineCalendarModule } from 'angular-gantt-schedule-timeline-calendar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';

import { UITimelineComponent } from './ui-timeline.component';
import { UIVisualizationModule } from '../ui-visualization.module';

@NgModule({
	declarations: [UITimelineComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		UIVisualizationModule,
		AngularGanttScheduleTimelineCalendarModule,
		NzSelectModule,
		NzButtonModule,
		NzSliderModule
	],
	exports: [UITimelineComponent],
	providers: []
})
export class UITimelineModule {}
