import { Injectable } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FilterSortService } from 'libs/utilities/src/lib/services/filter-sort.service';
import { UtilityService } from 'libs/utilities/src/lib/services/utility.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { isDate } from './../../../../utilities/src/lib/utilities/dates/isDate';
import { getPropertyTypesForArray } from './../../../../utilities/src/lib/utilities/getTypes';

interface FilterState {
	[propName: string]: { [value: string]: boolean };
}

interface FilterAction {
	filterProps: any;
	valuesToFilter: any;
	filteredData: any[];
}

interface UniqueValues {
	[prop: string]: {
		uniqueValues: { [value: string]: { count: number; percent?: number } };
		showMore: boolean;
		sortByControl: FormControl;
	};
}

@Injectable()
export class UIFilterService {
	searchControl: FormControl;
	searchValue$ = new Subject<any>();

	filterForm = this.fb.group({});
	filterChange$;

	filterInstantly: boolean;

	ignoreProps = ['id', 'version'];
	categoryMap = {};
	propTypeMap = {};
	uniqueProps = [];
	uniqueValues: UniqueValues = {};

	dataFiltered$ = new Subject<any[]>();
	originalData: any[];
	filteredData: any[];
	filterProps: any[];
	valuesToFilter: any;

	constructor(
		private fb: FormBuilder,
		private fs: FilterSortService,
		private route: ActivatedRoute,
		private utilities: UtilityService
	) {
		this.searchControl = new FormControl('');
		this.searchControl.valueChanges.pipe(debounceTime(314)).subscribe((value) => {
			if (!value || value === '') {
				this.dataFiltered$.next((this.filteredData || []).slice());
				this.utilities.handleUrlParameters({ paramsToDelete: ['searchValue'] });
			} else {
				this.dataFiltered$.next(
					this.fs.search(this.filteredData, value, null, ['id', 'version'])
				);
				this.utilities.handleUrlParameters({ paramsToAdd: { searchValue: value } });
			}

			this.searchValue$.next(value);
		});
	}

	setupFilterState(data: any[]) {
		this.originalData = data;
		if (!data) return;

		this.propTypeMap = getPropertyTypesForArray(data, this.ignoreProps);

		this.uniqueProps = Object.keys(this.propTypeMap)
			.sort()
			.filter((k) => !this.ignoreProps.includes(k));
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
					const startDate = new Date(urlFilterValue[0]),
						endDate = new Date(urlFilterValue[1]);
					if (!(isDate(startDate) || isDate(endDate))) {
						propState[p] = false;
					} else {
						propState[p] = [startDate, endDate];
					}
				} else {
					propState[p] = false;
				}
				this.filterForm.get(p).setValue(propState);
			} else {
				Object.keys(this.uniqueValues[p].uniqueValues).forEach((v) => {
					if (urlFilterValue) {
						propState[v] = urlFilterValue.includes(v);
					} else {
						propState[v] = false; // every value is disabled by default
					}
				});

				this.filterForm.addControl(p, this.fb.group(propState));
			}
		});

		this.filterChange$ = this.filterForm.valueChanges.pipe().subscribe((filterState) => {
			if (this.filterInstantly) this.doFullFilter(filterState);
		});

		if (urlFilterState) {
			this.doFullFilter(this.filterForm.value); // capture any initial filters
		}
	}

	setupUniqueValues(data: any[] = []) {
		this.uniqueValues = {};

		// First, use map big O performance to easily build up counts without needing to search
		(data || []).forEach((d) => {
			Object.keys(d).forEach((prop) => {
				if (!this.uniqueValues[prop]) {
					this.uniqueValues[prop] = {
						uniqueValues: {},
						showMore: false,
						sortByControl: new FormControl('count')
					};
				}

				const keyMap = this.uniqueValues[prop].uniqueValues;
				const value = d[prop] || '~None~';
				if (keyMap[value]) {
					keyMap[value].count++;
				} else {
					keyMap[value] = { count: 1 };
				}
			});
		});

		// Calculate percents
		Object.keys(this.uniqueValues).forEach((filterProp) => {
			const uniqueValues = this.uniqueValues[filterProp].uniqueValues;

			const total = Object.keys(uniqueValues).reduce((accumulate, current) => {
				return uniqueValues[current].count + accumulate;
			}, 0);

			Object.keys(uniqueValues).forEach((uniqueValue) => {
				uniqueValues[uniqueValue].percent = uniqueValues[uniqueValue].count / total;
			});
		});
	}

	removeFilterValue(filter: string, value: any) {
		if (this.propTypeMap[filter] === 'date') {
			this.filterForm.get(filter).setValue({ [filter]: false });
		} else {
			this.filterForm
				.get(filter)
				.get(value === '' ? '~None~' : value)
				.setValue(false);
		}

		this.applyFilters();
	}

	applyFilters() {
		this.doFullFilter(this.filterForm.value);
	}

	doFullFilter(filterState) {
		this.filterProps = [];
		this.valuesToFilter = {};

		const fullFiltered = this.filterData(filterState);
		this.setFilterUrlParameters(fullFiltered.filterProps, fullFiltered.valuesToFilter);

		this.filteredData = fullFiltered.filteredData;
		this.filterProps = fullFiltered.filterProps;
		this.valuesToFilter = fullFiltered.valuesToFilter;

		this.dataFiltered$.next(fullFiltered.filteredData);
	}

	private setFilterUrlParameters(filterProps: any, valuesToFilter: any) {
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
	}

	filterData(filterState: FilterState): FilterAction {
		const valuesToFilter = {};
		Object.keys(filterState).forEach((prop) => {
			const values = filterState[prop];

			if (this.propTypeMap[prop] === 'date') {
				if (!values[prop] || values[prop].toString() === 'Invalid Date') return;
				valuesToFilter[prop] = values[prop];
			} else {
				Object.keys(values).forEach((value) => {
					if (values[value]) {
						const transformedValue = value === '~None~' ? '' : value;
						if (valuesToFilter[prop]) {
							valuesToFilter[prop].push(transformedValue);
						} else {
							valuesToFilter[prop] = [transformedValue];
						}
					}
				});
			}
		});

		Object.keys(valuesToFilter).forEach((filterProp) => {
			if (
				!Array.isArray(valuesToFilter[filterProp]) ||
				this.propTypeMap[filterProp] === 'date'
			)
				return;
			valuesToFilter[filterProp] = valuesToFilter[filterProp].sort();
		});
		const filterProps = Object.keys(valuesToFilter).sort();

		let filteredData = [];
		if (!filterProps || !filterProps.length) {
			filteredData = [...(this.originalData || [])];
		} else {
			filteredData = this.doFilterDrillDown(valuesToFilter);
		}

		return {
			filterProps,
			valuesToFilter,
			filteredData
		};
	}

	doFilterDrillDown(valuesToFilter) {
		const filterProps = Object.keys(valuesToFilter);

		let matchedData = [];
		this.originalData.forEach((data) => {
			let matchesAll = [];
			for (let i = 0; i < filterProps.length; i++) {
				const filterProp = filterProps[i];
				const filterValue = valuesToFilter[filterProp];
				const dataValue = data[filterProp] || '';
				let foundMatch = false;

				if (this.propTypeMap[filterProp] === 'date') {
					const startDateRange = new Date(filterValue[0]),
						endDateRange = new Date(filterValue[1]),
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
}
