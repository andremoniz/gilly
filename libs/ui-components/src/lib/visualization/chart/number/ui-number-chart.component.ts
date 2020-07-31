import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { UIChartService } from '../ui-chart.service';
import { UIVisualizationBase } from '../../ui-visualization.base';

@Component({
	selector: 'ui-number-chart',
	template: `
		<ui-visualization (dimensionChange)="handleDimensionChange($event)">
			<ng-template #vis>
				<ng-container *ngIf="displayOptions && single && single.length">
					<ngx-charts-number-card
						[scheme]="displayOptions.colorScheme || 'vivid'"
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
export class UINumberChartComponent extends UIVisualizationBase implements OnInit {
	single: any[];

	constructor(public uiChartService: UIChartService, public cdRef: ChangeDetectorRef) {
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
