import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class FilterSortService {
	constructor(private datePipe: DatePipe) {}

	private _objArrayCheck(array: any[]): boolean {
		// Checks if the first item in the array is an object
		// (assumes same-shape for all array items)
		// Necessary because some arrays passed in may have
		// models that don't match {[id: string]: any}[]
		// This check prevents uncaught reference errors
		if (!array) {
			return false;
		}
		const item0 = array[0];
		const check = !!(
			array.length &&
			item0 !== null &&
			Object.prototype.toString.call(item0) === '[object Object]'
		);
		return check;
	}

	filter(array: any[], searchProp: string, query: string) {
		return array.filter((item) => item[searchProp] === query);
	}

	search(
		array: any[],
		query: string,
		searchProp?: string,
		excludeProps?: string | string[],
		dateFormat?: string
	) {
		// Match query to strings and Date objects / ISO UTC strings
		// Optionally exclude properties from being searched
		// If matching dates, can optionally pass in date format string
		if (!query || !this._objArrayCheck(array)) {
			return array;
		}
		const lQuery = query.toLowerCase();
		const isoDateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/; // ISO UTC
		const dateF = dateFormat ? dateFormat : 'medium';
		const filteredArray = array.filter((item) => {
			let found = false;

			if (searchProp) {
				if (item.hasOwnProperty(searchProp)) {
					if (!excludeProps || excludeProps.indexOf(searchProp) === -1) {
						const thisVal = item[searchProp];

						if (!thisVal) return;

						if (
							// Value is a string and NOT a UTC date
							typeof thisVal === 'string' &&
							!thisVal.match(isoDateRegex) &&
							thisVal.toLowerCase().indexOf(lQuery) !== -1
						) {
							found = true;
						} else if (
							// Value is a Date object or UTC string
							(thisVal instanceof Date || thisVal.toString().match(isoDateRegex)) &&
							// https://angular.io/api/common/DatePipe
							// Matching date format string passed in as param (or default to 'medium')
							this.datePipe
								.transform(thisVal, dateF)
								.toLowerCase()
								.indexOf(lQuery) !== -1
						) {
							found = true;
						}
					}
				}
			} else {
				Object.keys(item).forEach((key) => {
					if (found) return;

					if (!excludeProps || excludeProps.indexOf(key) === -1) {
						const thisVal = item[key];

						if (!thisVal) return;

						if (thisVal instanceof Array) {
							return; // TODO: Make recursive call to search though child array...
						}

						if (
							// Value is a string and NOT a UTC date
							typeof thisVal === 'string' &&
							!thisVal.match(isoDateRegex) &&
							thisVal.toLowerCase().indexOf(lQuery) !== -1
						) {
							found = true;
						} else if (
							// Value is a Date object or UTC string
							(thisVal instanceof Date || thisVal.toString().match(isoDateRegex)) &&
							// https://angular.io/api/common/DatePipe
							// Matching date format string passed in as param (or default to 'medium')
							this.datePipe
								.transform(thisVal, dateF)
								.toLowerCase()
								.indexOf(lQuery) !== -1
						) {
							found = true;
						}
					}
				});
			}

			return found;
		});
		return filteredArray;
	}

	searchObject(
		obj: any,
		query: string,
		excludeProps?: string | string[],
		dateFormat?: string
	): boolean {
		const isoDateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/; // ISO UTC
		const lQuery = query.toLowerCase();
		const dateF = dateFormat ? dateFormat : 'medium';

		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				if ((!excludeProps || excludeProps.indexOf(key) === -1) && !(key === 'id')) {
					const thisVal = obj[key];

					if (!thisVal || thisVal instanceof Array) {
						continue; // TODO: Make recursive call to search though child array...
					}

					if (
						// Value is a string and NOT a UTC date
						typeof thisVal === 'string' &&
						!thisVal.match(isoDateRegex) &&
						thisVal.toLowerCase().indexOf(lQuery) !== -1
					) {
						return true;
					} else if (
						// Value is a Date object or UTC string
						(thisVal instanceof Date || thisVal.toString().match(isoDateRegex)) &&
						// https://angular.io/api/common/DatePipe
						// Matching date format string passed in as param (or default to 'medium')
						this.datePipe.transform(thisVal, dateF).toLowerCase().indexOf(lQuery) !== -1
					) {
						return true;
					}
				}
			}
		}

		return false;
	}

	noSearchResults(arr: any[], query: string): boolean {
		// Check if array searched by query returned any results
		return !!(!arr.length && query);
	}

	orderByDate(array: any[], prop: string, reverse?: boolean) {
		// Order an array of objects by a date property
		// Default: ascending (1992->2017 | Jan->Dec)
		if (!prop || !this._objArrayCheck(array)) {
			return array;
		}
		const sortedArray = array.sort((a, b) => {
			const dateA = new Date(a[prop]).getTime();
			const dateB = new Date(b[prop]).getTime();
			return !reverse ? dateA - dateB : dateB - dateA;
		});
		return sortedArray;
	}

	sort(array: any[], prop: string, reverse?: boolean, isDate?: boolean, isNumber?: boolean) {
		if (!prop || !this._objArrayCheck(array)) {
			return array;
		}

		const arrayToSort = [...array]; // for arrays that are read only

		const sortedArray = arrayToSort.sort((a, b) => {
			let aObj = a[prop],
				bObj = b[prop];
			if (isDate) (aObj = new Date(aObj)), (bObj = new Date(bObj));
			if (isNumber) (aObj = +aObj), (bObj = +bObj);
			return aObj === bObj ? 0 : aObj > bObj ? (!reverse ? 1 : -1) : !reverse ? -1 : 1;
		});

		return sortedArray;
	}

	sortInPlace(
		array: any[],
		prop: string,
		reverse?: boolean,
		isDate?: boolean,
		isNumber?: boolean
	) {
		if (!prop || !this._objArrayCheck(array)) {
			return array;
		}

		array.sort((a, b) => {
			let aObj = a[prop],
				bObj = b[prop];
			if (isDate) (aObj = new Date(aObj)), (bObj = new Date(bObj));
			if (isNumber) (aObj = +aObj), (bObj = +bObj);
			return aObj === bObj ? 0 : aObj > bObj ? (!reverse ? 1 : -1) : !reverse ? -1 : 1;
		});
	}

	compareSelects(o1: any, o2: any): boolean {
		let matched = false;

		if (o1 && o2) {
			if (o1.id || o2.id) {
				if (o1.id && o2.id) {
					matched = o1.id === o2.id;
				} else if (o1.id) {
					matched = o1.id === o2;
				} else if (o2.id) {
					matched = o2.id === o1;
				} else {
					matched = o1 === o2;
				}
			} else if (o1.optLabel || o2.optLabel) {
				if (o1.optLabel && o2.optLabel) {
					matched = o1.optLabel === o2.optLabel;
				} else if (o1.label) {
					matched = o1.optLabel === o2;
				} else if (o2.label) {
					matched = o2.optLabel === o1;
				} else {
					matched = o1 === o2;
				}
			} else if (o1.optValue || o2.optValue) {
				if (o1.optValue && o2.optValue) {
					matched = o1.optValue === o2.optValue;
				} else if (o1.label) {
					matched = o1.optValue === o2;
				} else if (o2.label) {
					matched = o2.optValue === o1;
				} else {
					matched = o1 === o2;
				}
			} else if (o1.label || o2.label) {
				if (o1.label && o2.label) {
					matched = o1.label === o2.label;
				} else if (o1.label) {
					matched = o1.label === o2;
				} else if (o2.label) {
					matched = o2.label === o1;
				} else {
					matched = o1 === o2;
				}
			} else if (o1 == o2) {
				matched = true;
			}
		} else {
			matched = o1 === o2;
		}

		return matched;
	}
}
