import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { UIChartBase } from '../ui-chart.base';
import { UIChartService } from './../ui-chart.service';

@Component({
	selector: 'ui-pie-chart',
	template: `
		<ui-visualization>
			<ng-template #vis>
				<ng-container *ngIf="displayOptions && single && single.length">
					<ng-container [ngSwitch]="displayOptions.pieChartType || 'pie'">
						<ng-container *ngSwitchCase="'pie-advanced'">
							<ngx-charts-advanced-pie-chart
								[scheme]="displayOptions.colorScheme || 'vivid'"
								[customColors]="customColors"
								[gradient]="displayOptions.gradient || false"
								[results]="single"
								(select)="onSelect($event)"
							>
							</ngx-charts-advanced-pie-chart>
						</ng-container>
						<ng-container *ngSwitchCase="'pie-grid'">
							<ngx-charts-pie-grid
								[scheme]="displayOptions.colorScheme || 'vivid'"
								[customColors]="customColors"
								[results]="single"
								(select)="onSelect($event)"
							>
							</ngx-charts-pie-grid>
						</ng-container>
						<ng-container *ngSwitchDefault>
							<ngx-charts-pie-chart
								[scheme]="displayOptions.colorScheme || 'vivid'"
								[customColors]="customColors"
								[gradient]="displayOptions.gradient || false"
								[legend]="
									!(displayOptions.hideLegend === undefined)
										? true
										: !displayOptions.hideLegend
								"
								[legendPosition]="displayOptions.legendPosition || 'right'"
								[labels]="displayOptions.showLabels || false"
								[doughnut]="displayOptions.isDoughnut || false"
								[explodeSlices]="displayOptions.explodeSlices || false"
								[results]="single"
								(select)="onSelect($event)"
							>
							</ngx-charts-pie-chart>
						</ng-container>
					</ng-container>
				</ng-container>
			</ng-template>
		</ui-visualization>
	`,
	styles: [``]
})
export class UIPieChartComponent extends UIChartBase implements OnInit {
	constructor(public cdRef: ChangeDetectorRef, public uiChartService: UIChartService) {
		super(uiChartService, cdRef);
	}

	ngOnInit(): void {}
}
