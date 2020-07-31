import { UIChartDisplayOptions } from '../ui-chart.interface';

export interface UIBarChartDisplayOptions extends UIChartDisplayOptions {
	isHorizontal?: boolean;

	gradient?: boolean;

	showDataLabel?: boolean;
	showGridLines?: boolean;
}
