import { UIChartService } from './../ui-chart.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UIVisualizationBase } from '../../ui-visualization.base';

@Component({
	selector: 'ui-gauge-chart',
	template: `
		<ui-visualization>
			<ng-template #vis>
				<ng-container *ngIf="displayOptions && single && single.length">
					<ngx-charts-gauge
						[results]="single"
						[scheme]="displayOptions.colorScheme || 'vivid'"
						[legend]="(displayOptions.hideLegend === undefined) ? true : !displayOptions.hideLegend"
						[legendPosition]="displayOptions.legendPosition || 'right'"
						(select)="onSelect($event)"
					>
					</ngx-charts-gauge>
					<!-- [legendPosition]="displayOptions.legendPosition || 'below'" -->
				</ng-container>
			</ng-template>
		</ui-visualization>
	`,
	styles: [``]
})
export class UIGaugeChartComponent extends UIVisualizationBase implements OnInit {
	single: any[];

	constructor(public cdRef: ChangeDetectorRef, public uiChartService: UIChartService) {
		super(cdRef);

		this.configLoaded$.subscribe((config) => {
			this.single = this.uiChartService.transformData(config.data, config.displayOptions);
		});
	}

	ngOnInit(): void {}

	onSelect(event) {
		this.handleGroupSelected(this.config.displayOptions.groupProp, event.name);
	}
}
