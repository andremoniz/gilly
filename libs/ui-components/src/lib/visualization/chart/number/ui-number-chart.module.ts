import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { UINumberChartComponent } from './ui-number-chart.component';
import { UIVisualizationModule } from '../../ui-visualization.module';

@NgModule({
	declarations: [UINumberChartComponent],
	imports: [CommonModule, NgxChartsModule, UIVisualizationModule],
	exports: [UINumberChartComponent],
	providers: []
})
export class UINumberChartModule {}
