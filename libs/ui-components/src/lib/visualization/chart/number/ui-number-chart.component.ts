import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { UIChartBase } from '../ui-chart.base';
import { UIChartService } from '../ui-chart.service';

@Component({
	selector: 'ui-number-chart',
	template: `
		<ui-visualization (dimensionChange)="handleDimensionChange($event)">
			<ng-template #vis>
				<ng-container *ngIf="displayOptions && single && single.length">
					<ngx-charts-number-card
						[scheme]="displayOptions.colorScheme || 'vivid'"
						[customColors]="customColors"
						[results]="single"
						[cardColor]="displayOptions.cardColor || '#232837'"
						(select)="onSelect($event)"
					>
					</ngx-charts-number-card>
				</ng-container>
			</ng-template>
		</ui-visualization>
	`,
	styles: [``]
})
export class UINumberChartComponent extends UIChartBase implements OnInit {
	constructor(public uiChartService: UIChartService, public cdRef: ChangeDetectorRef) {
		super(uiChartService, cdRef);
	}

	ngOnInit(): void {}
}
