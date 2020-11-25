import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { UIChartBase } from '../ui-chart.base';
import { UIChartService } from './../ui-chart.service';

@Component({
	selector: 'ui-tree-chart',
	template: `
		<ui-visualization>
			<ng-template #vis>
				<ng-container *ngIf="displayOptions && single && single.length">
					<ngx-charts-tree-map
						[scheme]="displayOptions.colorScheme || 'vivid'"
						[customColors]="customColors"
						[gradient]="displayOptions.gradient || false"
						[results]="single"
						(select)="onSelect($event)"
					>
					</ngx-charts-tree-map>
				</ng-container>
			</ng-template>
		</ui-visualization>
	`,
	styles: [``]
})
export class UITreeChartComponent extends UIChartBase implements OnInit {
	constructor(public uiChartService: UIChartService, public cdRef: ChangeDetectorRef) {
		super(uiChartService, cdRef);
	}

	ngOnInit(): void {}
}
