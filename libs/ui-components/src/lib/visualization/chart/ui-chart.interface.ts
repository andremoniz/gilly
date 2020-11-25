import { UIVisualization } from './../ui-visualization.interface';

export interface UIChartDisplayOptions extends UIVisualization {
	groupProp?: string;

	xAxisLabel?: string;
	yAxisLabel?: string;

	aggregation?: string;

	colorScheme?: string;

	hideLegend?: boolean;
	legendPosition?: string; // 'below', 'right'
	legendTitle?: string;

	showXAxisLabel?: boolean;
	showXAxis?: boolean;
	showYAxisLabel?: boolean;
	showYAxis?: boolean;
}
