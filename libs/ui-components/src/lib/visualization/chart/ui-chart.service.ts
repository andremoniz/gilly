import { Injectable } from '@angular/core';
import { FilterSortService } from 'libs/utilities/src/lib/services/filter-sort.service';

@Injectable({ providedIn: 'root' })
export class UIChartService {
	constructor(private fs: FilterSortService) {}

	transformData(data: any[] = [], displayOptions: any) {
		const transformedData = [];

		const aggregation = this.getAggregateForData(data, displayOptions);
		Object.keys(aggregation)
			.sort(this.sortChartData)
			.forEach((key) => transformedData.push({ name: key, value: aggregation[key] }));

		return transformedData;
	}

	transformDataSeries(data: any[] = [], displayOptions: any) {
		const transformedData = [];

		const series = new Set(data.map((d) => d[displayOptions.seriesProp]));

		Array.from(series)
			.map((s) => (!s ? 'None' : s))
			.sort(this.sortChartData)
			.forEach((s) => {
				const transformed: { name?: string; series?: any[] } = {};
				let seriesData = data.filter((d) => d[displayOptions.seriesProp] === s);
				seriesData = this.fs.sort(seriesData, displayOptions.groupProp);

				const aggregation = this.getAggregateForData(seriesData, displayOptions);

				seriesData = seriesData.map((sd) => {
					return {
						name: sd[displayOptions.groupProp],
						value: aggregation[sd[displayOptions.groupProp]]
					};
				});

				transformed.name = s;
				transformed.series = seriesData.filter((sd) => sd.name !== null);

				transformedData.push(transformed);
			});

		return transformedData;
	}

	transformDataBubble(data: any[] = [], displayOptions: any) {
		const series = this.transformDataSeries(data, displayOptions);

		return series.map((s) => {
			return {
				name: s.name,
				series: s.series.map((subS) => {
					return {
						name: subS.name,
						x: subS.name,
						y: subS.value,
						r: subS.value
					};
				})
			};
		});
	}

	private sortChartData(a, b) {
		if (a === 'None' || b === 'None') {
			if (a === 'None' && b === 'None') {
				return 0;
			} else if (a === 'None') {
				return 1;
			} else if (b === 'None') {
				return -1;
			}
		} else {
			return a === b ? 0 : a > b ? 1 : -1;
		}
	}

	private getAggregateForData(data: any[] = [], displayOptions: any) {
		const groupProp = displayOptions.groupProp,
			aggregation = displayOptions.aggregation || AGGREGATION.COUNT;

		const aggregated = {};

		let group;

		data.forEach((d) => {
			switch (aggregation) {
				case AGGREGATION.COUNT:
					group = d[groupProp];

					if (!group) group = 'None';

					if (aggregated[group]) {
						aggregated[group]++;
					} else {
						aggregated[group] = 1;
					}
					break;
				case AGGREGATION.VALUE_SUM:
					group = d[groupProp];
					let value = d[displayOptions.valueProp];

					if (!group) group = 'None';

					if (aggregated[group]) {
						aggregated[group] += value || 0;
					} else {
						aggregated[group] = value || 0;
					}
					break;
				default:
					break;
			}
		});
		return aggregated;
	}

	generateCustomColors(displayOptions: any) {
		const customColors = [];
		if (displayOptions.dataDrivenColors) {
			displayOptions.dataDrivenColors.forEach((ddc) =>
				customColors.push({ name: ddc.fieldValue, value: ddc.color })
			);
		}
		return customColors;
	}
}

export enum AGGREGATION {
	COUNT = 'COUNT',
	VALUE_SUM = 'VALUE_SUM'
}
