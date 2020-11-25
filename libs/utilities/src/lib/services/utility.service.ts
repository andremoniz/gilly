import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class UtilityService {
	isSmallScreen: boolean = false;

	constructor(
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
