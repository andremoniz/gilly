import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { UIChartBase } from '../ui-chart.base';
import { UIChartService } from './../ui-chart.service';

@Component({
	selector: 'ui-polar-chart',
	template: `
		<ui-visualization>
			<ng-template #vis>
				<ng-container *ngIf="displayOptions && multi && multi.length">
					<ngx-charts-polar-chart
						[scheme]="displayOptions.colorScheme || 'vivid'"
						[customColors]="customColors"
						[legend]="
							displayOptions.hideLegend === undefined
								? true
								: !displayOptions.hideLegend
						"
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
							displayOptions.aggregation.toUpperCase() +
								' of ' +
								displayOptions.xAxisLabel
						"
						[results]="multi"
						(select)="onSelect($event)"
					>
					</ngx-charts-polar-chart>
				</ng-container>
			</ng-template>
		</ui-visualization>
	`,
	styles: [``]
})
export class UIPolarChartComponent extends UIChartBase implements OnInit {
	constructor(public uiChartService: UIChartService, public cdRef: ChangeDetectorRef) {
		super(uiChartService, cdRef);

		this.configLoaded$.subscribe((config) => {
			this.multi = this.uiChartService.transformDataSeries(
				config.data,
				config.displayOptions
			);
		});
	}

	ngOnInit(): void {}
}
