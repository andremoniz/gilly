import { UIChartDisplayOptions } from '../ui-chart.interface';

export interface UILineChartDisplayOptions extends UIChartDisplayOptions {
	seriesProp?: string;
	
	showLabels?: boolean;
	showGridLines?: boolean;
}
