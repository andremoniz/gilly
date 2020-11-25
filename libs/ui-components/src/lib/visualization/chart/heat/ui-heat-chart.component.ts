import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { UIChartBase } from '../ui-chart.base';
import { UIChartService } from './../ui-chart.service';

@Component({
	selector: 'ui-heat-chart',
	template: `
		<ui-visualization>
			<ng-template #vis>
				<ng-container *ngIf="displayOptions && multi && multi.length">
					<ngx-charts-heat-map
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
					</ngx-charts-heat-map>
				</ng-container>
			</ng-template>
		</ui-visualization>
	`,
	styles: [``]
})
export class UIHeatChartComponent extends UIChartBase implements OnInit {
	constructor(public cdRef: ChangeDetectorRef, public uiChartService: UIChartService) {
		super(uiChartService, cdRef);
	}

	ngOnInit(): void {}
}
