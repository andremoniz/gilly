import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { UIVisualizationModule } from '../../ui-visualization.module';
import { UIPolarChartComponent } from './ui-polar-chart.component';

@NgModule({
	declarations: [UIPolarChartComponent],
	imports: [CommonModule, NgxChartsModule, UIVisualizationModule],
	exports: [UIPolarChartComponent],
	providers: []
})
export class UIPolarChartModule {}
