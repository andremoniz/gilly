import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parseISO } from 'date-fns';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable()
export class UtilityService {
	isSmallScreen: boolean = false;

	constructor(
		private datePipe: DatePipe,
		private breakpointObserver: BreakpointObserver,
		private route: ActivatedRoute,
		private router: Router
	) {
		breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
			if (result.matches) {
				this.isSmallScreen = true;
			} else {
				this.isSmallScreen = false;
			}
		});
	}

	createFromModelType<T>(model: { new (...args: any[]): T }): T {
		return new model({});
	}

	isLoaded(loading: boolean): boolean {
		return loading === false;
	}

	formatDate(date): string {
		const dateString = this.datePipe.transform(date, 'longDate');
		return dateString;
	}

	formatDateMedium(date): string {
		const dateString = this.datePipe.transform(date, 'mediumDate');
		return dateString;
	}

	formatDateShort(date): string {
		const dateString = this.datePipe.transform(date, 'shortDate');
		return dateString;
	}

	capitalizeFirstLetter(str): string {
		if (!str) return '';
		const transformedStr = str.slice();
		return transformedStr[0].toUpperCase() + transformedStr.slice(1);
	}

	prettyPrint(str): string {
		if (!str) return '';
		const prettyStr = str
			.match(/([A-Z]?[^A-Z]*)/g)
			.slice(0, -1)
			.join(' ');
		return this.capitalizeFirstLetter(prettyStr);
	}

	handleUrlParameters(opts: {
		paramsToAdd?: { [key: string]: any | any[] };
		paramsToDelete?: string[];
		deleteAll?: boolean;
	}) {
		let urlParameters = Object.assign({}, this.route.snapshot.queryParams);

		if (opts.paramsToDelete) {
			opts.paramsToDelete.forEach((param) => delete urlParameters[param]);
		}
		if (opts.paramsToAdd) {
			Object.keys(opts.paramsToAdd).forEach(
				(param) => (urlParameters[param] = opts.paramsToAdd[param])
			);
		}
		if (opts.deleteAll) {
			urlParameters = {};
		}

		this.router.navigate([], { relativeTo: this.route, queryParams: urlParameters });
	}

	getPropertyTypesForArray(arr: any[] = [], ignoreProps: string[] = []) {
		const propTypeMap = {};

		(arr || []).forEach((d) => {
			const oTypeMap = this.getPropertyTypes(d, ignoreProps);
			Object.assign(propTypeMap, oTypeMap);
		});

		return propTypeMap;
	}

	getPropertyTypes(obj: any, ignoreProps: string[] = []) {
		const propTypeMap = {};
		Object.keys(obj).forEach((key) => {
			if (ignoreProps.find((p) => p === key)) return;
			propTypeMap[key] = this.getValueType(obj[key]);
		});
		return propTypeMap;
	}

	getValueType(value) {
		if (!value) return null;

		let type = 'string';
		switch (typeof value) {
			case 'number':
				type = 'number';
				break;
			case 'string':
				if (this.isDate(value)) type = 'date';
				else type = 'string';
				break;
			case 'object':
				if (this.isDate(value)) type = 'date';
				else if (value instanceof Array) type = 'array';
				else type = 'object';
				break;
			default:
				type = 'string';
				break;
		}
		return type;
	}

	isDate(value: any) {
		const parsed = <any>parseISO(value);
		return parsed.toString() !== 'Invalid Date';
	}

	getColorForPercentage(pct) {
		if (!pct) {
			if (pct === 0) {
			} else {
				return null;
			}
		}
		const percentColors = [
			{ pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
			{ pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
			{ pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } }
		];

		for (var i = 1; i < percentColors.length - 1; i++) {
			if (pct < percentColors[i].pct) {
				break;
			}
		}
		var lower = percentColors[i - 1];
		var upper = percentColors[i];
		var range = upper.pct - lower.pct;
		var rangePct = (pct - lower.pct) / range;
		var pctLower = 1 - rangePct;
		var pctUpper = rangePct;
		var color = {
			r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
			g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
			b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
		};
		return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
	}
}
