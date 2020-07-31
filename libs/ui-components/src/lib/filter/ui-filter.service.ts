import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'libs/utilities/src/lib/services/utility.service';
import { Subject } from 'rxjs';

@Injectable()
export class UIFilterService {
	filterForm = this.fb.group({});
	filterChange$;
	filterDrillDown = false;

	ignoreProps = ['id', 'version'];
	propTypeMap = {};
	uniqueValues: any = {};

	dataFiltered$ = new Subject<any[]>();
	filteredData: any[];
	originalData: any[];

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private utilities: UtilityService
	) {}

	setFilterData(data: any[]) {
		this.filteredData = data;
		this.setupFilterState(data);
	}

	getUniqueProps() {
		return Object.keys(this.propTypeMap)
			.sort()
			.filter((k) => !this.ignoreProps.includes(k));
	}

	getUniqueValuesForProp(prop: string) {
		return this.uniqueValues[prop];
	}

	setupUniqueValues(data: any[] = []) {
		this.uniqueValues = {};

		// First, use map big O performance to easily build up counts without needing to search
		data.forEach((d) => {
			Object.keys(d).forEach((key) => {
				if (!this.uniqueValues[key]) {
					this.uniqueValues[key] = {};
				}
				const keyMap = this.uniqueValues[key];
				const value = d[key] || 'None';
				if (keyMap[value]) {
					keyMap[value]++;
				} else {
					keyMap[value] = 1;
				}
			});
		});

		// Transform value count map into a useable structure, sort by total count
		Object.keys(this.uniqueValues).forEach((key) => {
			const valueMapping = [];
			const uniqueKeyValues = this.uniqueValues[key];
			Object.keys(uniqueKeyValues).forEach((uniqueValue) => {
				valueMapping.push({
					value: uniqueValue,
					count: uniqueKeyValues[uniqueValue]
				});
			});
			valueMapping.sort((a, b) =>
				a.count === b.count
					? a.value === b.value
						? 0
						: a.value > b.value
						? 1
						: -1
					: a.count > b.count
					? -1
					: 1
			);
			this.uniqueValues[key] = {
				values: valueMapping,
				showMore: false
			};
		});
	}

	setupFilterState(data: any[]) {
		if (this.originalData) return; // only do this once...figure out a better way to make that happen
		this.originalData = data;

		this.propTypeMap = this.utilities.getPropertyTypesForArray(data, this.ignoreProps);
		this.setupUniqueValues(this.originalData);

		this.filterForm = this.fb.group({});

		const filterStateParam = this.route.snapshot.queryParams.filterState;
		let urlFilterState;
		if (filterStateParam) {
			urlFilterState = JSON.parse(filterStateParam);
		}

		Object.keys(this.propTypeMap).forEach((p) => {
			const propState = {};
			const urlFilterValue = urlFilterState && urlFilterState[p];

			if (this.propTypeMap[p] === 'date') {
				propState[p] = {};
				this.filterForm.addControl(p, this.fb.group(propState));
				if (urlFilterValue) {
					const dateSplit = urlFilterValue.split('-');
					const startDate = new Date(dateSplit[0]),
						endDate = new Date(dateSplit[1]);
					if (
						startDate.toString() === 'Invalid Date' ||
						endDate.toString() === 'Invalid Date'
					) {
						propState[p] = false;
					} else {
						propState[p] = [startDate, endDate];
					}
				} else {
					propState[p] = false;
				}
				this.filterForm.get(p).setValue(propState);
			} else {
				this.uniqueValues[p].values.forEach((v) => {
					if (urlFilterValue) {
						propState[v.value] = urlFilterValue.includes(v.value);
					} else {
						propState[v.value] = false; // every value is disabled by default
					}
				});

				this.filterForm.addControl(p, this.fb.group(propState));
			}
		});

		this.filterChange$ = this.filterForm.valueChanges.subscribe((filterState) => {
			this.filterData(filterState);
		});

		this.filterData(this.filterForm.value); // capture any initial filters
	}

	filterData(filterState) {
		const valuesToFilter = {};
		Object.keys(filterState).forEach((prop) => {
			const values = filterState[prop];

			if (this.propTypeMap[prop] === 'date') {
				if (!values[prop] || values[prop].toString() === 'Invalid Date') return;
				valuesToFilter[prop] = `${values[prop][0]}-${values[prop][1]}`;
			} else {
				Object.keys(values).forEach((value) => {
					if (values[value]) {
						const transformedValue = value === 'None' ? undefined : value;
						if (valuesToFilter[prop]) {
							valuesToFilter[prop].push(transformedValue);
						} else {
							valuesToFilter[prop] = [transformedValue];
						}
					}
				});
			}
		});

		const filterProps = Object.keys(valuesToFilter);
		let filteredData = [];
		if (!filterProps || !filterProps.length) {
			filteredData = [...this.originalData];
		} else {
			if (this.filterDrillDown) {
				filteredData = this.doFilterDrillDown(valuesToFilter);
			} else {
				filteredData = this.doFilterAny(valuesToFilter);
			}
		}

		const paramsToAdd =
			filterProps && filterProps.length
				? { filterState: JSON.stringify(valuesToFilter) }
				: null;
		const paramsToDelete = !filterProps || !filterProps.length ? ['filterState'] : null;

		this.utilities.handleUrlParameters({
			paramsToAdd: paramsToAdd,
			paramsToDelete: paramsToDelete
			// deleteAll: !paramsToAdd && !paramsToDelete
		});

		this.dataFiltered$.next(filteredData);
	}

	doFilterDrillDown(valuesToFilter) {
		const filterProps = Object.keys(valuesToFilter);
		let matchedData = [];
		let matchesAll = [];
		this.originalData.forEach((data) => {
			for (let i = 0; i < filterProps.length; i++) {
				const filterProp = filterProps[i];
				const dataValue = data[filterProp];
				let foundMatch = false;

				if (this.propTypeMap[filterProp] === 'date') {
					const splitRange = valuesToFilter[filterProp].split('-');
					const startDateRange = new Date(splitRange[0]),
						endDateRange = new Date(splitRange[1]),
						dataDateValue = new Date(dataValue);
					if (startDateRange <= dataDateValue && dataDateValue <= endDateRange) {
						foundMatch = true;
					}
				} else {
					const filterValue = valuesToFilter[filterProp];
					if (filterValue.includes(dataValue)) {
						foundMatch = true;
					}
				}

				if (foundMatch) {
					matchesAll.push(true);
				} else {
					matchesAll.push(false);
					break;
				}
			}
			if (!matchesAll.includes(false)) {
				// only include it if it matches all filters
				matchedData.push(data);
			}
		});

		return matchedData;
	}

	doFilterAny(valuesToFilter) {
		const filterProps = Object.keys(valuesToFilter);
		const matchedData = [];
		this.originalData.forEach((data) => {
			for (let i = 0; i < filterProps.length; i++) {
				const filterProp = filterProps[i];
				const dataValue = data[filterProp];
				let foundMatch = false;

				if (this.propTypeMap[filterProp] === 'date') {
					const splitRange = valuesToFilter[filterProp].split('-');
					const startDateRange = new Date(splitRange[0]),
						endDateRange = new Date(splitRange[1]),
						dataDateValue = new Date(dataValue);
					if (startDateRange <= dataDateValue && dataDateValue <= endDateRange) {
						foundMatch = true;
					}
				} else {
					const filterValue = valuesToFilter[filterProp];
					if (filterValue.includes(dataValue)) {
						foundMatch = true;
					}
				}

				if (foundMatch) {
					if (matchedData.find((mr) => mr.id === data.id)) break;
					matchedData.push(data);

					break;
				}
			}
		});

		return matchedData;
	}
}
