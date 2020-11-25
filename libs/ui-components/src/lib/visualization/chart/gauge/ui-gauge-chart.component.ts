import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { UIChartBase } from '../ui-chart.base';
import { UIChartService } from './../ui-chart.service';

@Component({
	selector: 'ui-gauge-chart',
	template: `
		<ui-visualization>
			<ng-template #vis>
				<ng-container *ngIf="displayOptions && single && single.length">
					<ngx-charts-gauge
						[results]="single"
						[scheme]="displayOptions.colorScheme || 'vivid'"
						[customColors]="customColors"
						[legend]="
							displayOptions.hideLegend === undefined
								? true
								: !displayOptions.hideLegend
						"
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
export class UIGaugeChartComponent extends UIChartBase implements OnInit {
	constructor(public cdRef: ChangeDetectorRef, public uiChartService: UIChartService) {
		super(uiChartService, cdRef);
	}

	ngOnInit(): void {}
}
