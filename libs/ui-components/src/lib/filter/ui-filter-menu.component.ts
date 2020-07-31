import { Component, Input, OnInit } from '@angular/core';

import { UtilityService } from './../../../../utilities/src/lib/services/utility.service';
import { UIFilterService } from './ui-filter.service';
import { endOfMonth } from 'date-fns';

@Component({
	selector: 'ui-filter-menu',
	templateUrl: `ui-filter-menu.component.html`,
	styles: [
		`
			.filter-list {
				display: grid;
				overflow: hidden;
				grid-template-columns: repeat(4, 1fr);
				grid-auto-rows: 1fr;
				grid-row-gap: 0.1rem;
				grid-column-gap: 0.5rem;
				width: 95%;
			}

			.filter-list-item {
				display: flex;
				padding: 0.5rem;
				margin-bottom: 1rem;
			}

			.filter-list-content {
				width: 100%;
			}

			.ant-checkbox-wrapper {
				margin-left: 0px !important;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			::ng-deep label > span:nth-child(2) {
				display: flex;
				justify-content: space-between;
				width: 100% !important;
			}

			::ng-deep label > span {
				align-items: center;
			}

			nz-range-picker {
				margin: 0.5rem;
			}
		`
	]
})
export class UIFilterMenuComponent implements OnInit {
	dateRanges = {
		Today: [new Date(), new Date()],
		'This Month': [new Date(), endOfMonth(new Date())]
	};

	@Input() data: any[];

	constructor(public uiFilterService: UIFilterService, public utilities: UtilityService) {}

	ngOnInit(): void {}

	removeAllValues() {
		const temp = [...this.uiFilterService.originalData];
		this.uiFilterService.originalData = null;
		this.uiFilterService.setupFilterState(temp);
	}

	toggleFilterDrillDown(event) {
		if (!event) this.uiFilterService.setupUniqueValues();
		this.uiFilterService.filterData(this.uiFilterService.filterForm.value);
	}

	clearDateInput(event, prop) {
		const resetValue = {};
		resetValue[`${prop}`] = false;

		this.uiFilterService.filterForm.get(prop).setValue(resetValue);
	}
}
