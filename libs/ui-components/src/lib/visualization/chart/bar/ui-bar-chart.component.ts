import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { UIChartBase } from '../ui-chart.base';
import { UIChartService } from '../ui-chart.service';

@Component({
	selector: 'ui-bar-chart',
	template: `
		<ui-visualization (dimensionChange)="handleDimensionChange($event)">
			<ng-template #vis>
				<ng-container *ngIf="displayOptions && single && single.length">
					<ng-container *ngIf="!displayOptions.isHorizontal">
						<ngx-charts-bar-vertical
							[scheme]="displayOptions.colorScheme || 'vivid'"
							[customColors]="customColors"
							[results]="single"
							[gradient]="displayOptions.gradient || false"
							[xAxis]="displayOptions.showXAxis || true"
							[yAxis]="displayOptions.showYAxis || true"
							[legend]="
								displayOptions.hideLegend === undefined
									? true
									: !displayOptions.hideLegend
							"
							[legendPosition]="displayOptions.legendPosition || 'right'"
							[showXAxisLabel]="displayOptions.showXAxisLabel || true"
							[showYAxisLabel]="displayOptions.showYAxisLabel || true"
							[xAxisLabel]="displayOptions.xAxisLabel || ''"
							[yAxisLabel]="
								displayOptions.yAxisLabel ||
								(displayOptions.aggregation || 'Count').toUpperCase() +
									' of ' +
									displayOptions.xAxisLabel
							"
							[rotateXAxisTicks]="true"
							[showDataLabel]="displayOptions.showDataLabel || true"
							(select)="onSelect($event)"
						>
						</ngx-charts-bar-vertical>
					</ng-container>

					<ng-container *ngIf="displayOptions.isHorizontal">
						<ngx-charts-bar-horizontal
							[scheme]="displayOptions.colorScheme || 'vivid'"
							[customColors]="customColors"
							[results]="single"
							[gradient]="displayOptions.gradient || false"
							[xAxis]="displayOptions.showXAxis || true"
							[yAxis]="displayOptions.showYAxis || true"
							[legend]="
								displayOptions.hideLegend === undefined
									? true
									: !displayOptions.hideLegend
							"
							[legendPosition]="displayOptions.legendPosition || 'right'"
							[showXAxisLabel]="displayOptions.showXAxisLabel || true"
							[showYAxisLabel]="displayOptions.showYAxisLabel || true"
							[xAxisLabel]="
								displayOptions.yAxisLabel ||
								(displayOptions.aggregation || 'Count').toUpperCase() +
									' of ' +
									displayOptions.xAxisLabel
							"
							[yAxisLabel]="displayOptions.xAxisLabel || ''"
							[showDataLabel]="displayOptions.showDataLabel || true"
							[rotateXAxisTicks]="true"
							(select)="onSelect($event)"
						>
						</ngx-charts-bar-horizontal
					></ng-container>
				</ng-container>
			</ng-template>
		</ui-visualization>
	`,
	styles: [``]
})
export class UIBarChartComponent extends UIChartBase implements OnInit {
	constructor(public uiChartService: UIChartService, public cdRef: ChangeDetectorRef) {
		super(uiChartService, cdRef);
	}

	ngOnInit(): void {}
}
