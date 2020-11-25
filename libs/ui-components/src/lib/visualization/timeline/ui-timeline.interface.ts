import { UIVisualization } from './../ui-visualization.interface';

export interface UITimelineDisplayOptions extends UIVisualization {
	rowProp?: string;
	subRowProp?: string;

	startProp?: string;
	endProp?: string;

	labelProp?: string;

	tooltipProps?: string[];

	period?: TimePeriods;

	title?: string;

	setUrlParameters?: boolean;
}

export enum TimePeriods {
	HOUR = 'hour',
	DAY = 'day',
	WEEK = 'week',
	MONTH = 'month',
	YEAR = 'year'
}
