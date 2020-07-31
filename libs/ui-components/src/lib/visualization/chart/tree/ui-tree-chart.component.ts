import { UIChartService } from './../ui-chart.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UIVisualizationBase } from '../../ui-visualization.base';

@Component({
	selector: 'ui-tree-chart',
	template: `
		<ui-visualization>
			<ng-template #vis>
				<ng-container *ngIf="displayOptions && single && single.length">
					<ngx-charts-tree-map
						[scheme]="displayOptions.colorScheme || 'vivid'"
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
export class UITreeChartComponent extends UIVisualizationBase implements OnInit {
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
