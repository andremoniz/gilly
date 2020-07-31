export interface UITimelineDisplayOptions {
	rowProp?: string;
	labelProp?: string;
	startProp?: string;
	endProp?: string;

	period?: TimePeriods;

	title?: string;
}

export enum TimePeriods {
	HOUR = 'hour',
	DAY = 'day',
	WEEK = 'week',
	MONTH = 'month',
	YEAR = 'year'
}
