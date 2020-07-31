import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { UIVisualizationBase } from '../../ui-visualization.base';
import { UIChartService } from './../ui-chart.service';

@Component({
	selector: 'ui-bubble-chart',
	template: `
		<ui-visualization>
			<ng-template #vis>
				<ng-container *ngIf="displayOptions && multi && multi.length">
					<ngx-charts-bubble-chart
						[results]="multi"
						[scheme]="displayOptions.colorScheme || 'vivid'"
						[legend]="(displayOptions.hideLegend === undefined) ? true : !displayOptions.hideLegend"
						[xAxis]="displayOptions.showXAxis || true"
						[yAxis]="displayOptions.showYAxis || true"
						[legend]="(displayOptions.hideLegend === undefined) ? true : !displayOptions.hideLegend"
						[legendPosition]="displayOptions.legendPosition || 'right'"
						[showXAxisLabel]="displayOptions.showXAxisLabel || true"
						[showYAxisLabel]="displayOptions.showYAxisLabel || true"
						[xAxisLabel]="displayOptions.xAxisLabel || ''"
						[yAxisLabel]="
							displayOptions.yAxisLabel ||
							displayOptions.aggregation.toUpperCase() +
								' of ' +
								displayOptions.xAxisLabel
						"
						[xScaleMin]="xScaleMin"
						[xScaleMax]="xScaleMax"
						[yScaleMin]="yScaleMin"
						[yScaleMax]="yScaleMax"
						[minRadius]="minRadius"
						[maxRadius]="maxRadius"
						(select)="onSelect($event)"
					>
					</ngx-charts-bubble-chart>
				</ng-container>
			</ng-template>
		</ui-visualization>
	`,
	styles: [``]
})
export class UIBubbleChartComponent extends UIVisualizationBase implements OnInit {
	multi: any[];

	xScaleMin = 0;
	xScaleMax = 100;
	yScaleMin = 0;
	yScaleMax = 100;
	minRadius = 0;
	maxRadius = 100;

	constructor(public uiChartService: UIChartService, public cdRef: ChangeDetectorRef) {
		super(cdRef);

		this.configLoaded$.subscribe((config) => {
			this.multi = this.uiChartService.transformDataBubble(
				config.data,
				config.displayOptions
			);

			this.xScaleMin;
			this.xScaleMax;
			this.yScaleMin;
			this.yScaleMax;
			this.minRadius;
			this.maxRadius;
		});
	}

	ngOnInit(): void {}

	onSelect(event) {
		this.handleGroupSelected(this.config.displayOptions.groupProp, event.name);
	}
}
