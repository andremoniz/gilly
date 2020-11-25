import { ChangeDetectorRef } from '@angular/core';

import { UIVisualizationBase } from '../ui-visualization.base';
import { UIChartService } from './ui-chart.service';

export abstract class UIChartBase extends UIVisualizationBase {
	single: any[];
	multi: any[];
	customColors: any;

	constructor(public uiChartService: UIChartService, public cdRef: ChangeDetectorRef) {
		super(cdRef);

		this.configLoaded$.subscribe((config) => {
			config.displayOptions.aggregation = config.displayOptions.aggregation || 'VALUE_SUM';

			this.single = this.uiChartService.transformData(config.data, config.displayOptions);
			this.multi = this.multi = this.uiChartService.transformDataSeries(
				config.data,
				config.displayOptions
			);

			this.customColors = this.uiChartService.generateCustomColors(config.displayOptions);
		});
	}

	onSelect(event) {
		this.handleGroupSelected(this.config.displayOptions.groupProp, event.name);
	}
}
