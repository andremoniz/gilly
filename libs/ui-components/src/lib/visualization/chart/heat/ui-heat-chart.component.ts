import { UIChartService } from './../ui-chart.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UIVisualizationBase } from '../../ui-visualization.base';

@Component({
	selector: 'ui-heat-chart',
	template: `
		<ui-visualization>
			<ng-template #vis>
				<ng-container *ngIf="displayOptions && multi && multi.length">
					<ngx-charts-heat-map
						[scheme]="displayOptions.colorScheme || 'vivid'"
						[legend]="(displayOptions.hideLegend === undefined) ? true : !displayOptions.hideLegend"
						[xAxis]="displayOptions.showXAxis || true"
						[yAxis]="displayOptions.showYAxis || true"
						[legend]="(displayOptions.hideLegend === undefined) ? true : !displayOptions.hideLegend"
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
export class UIHeatChartComponent extends UIVisualizationBase implements OnInit {
	multi: any[];

	constructor(public cdRef: ChangeDetectorRef, public uiChartService: UIChartService) {
		super(cdRef);

		this.configLoaded$.subscribe((config) => {
			this.multi = this.uiChartService.transformDataSeries(
				config.data,
				config.displayOptions
			);
		});
	}

	ngOnInit(): void {}

	onSelect(event) {
		this.handleGroupSelected(this.config.displayOptions.groupProp, event.name);
	}
}
