import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FilterSortService } from 'libs/utilities/src/lib/services/filter-sort.service';

import { UtilityService } from '../../../../../utilities/src/lib/services/utility.service';
import { UIVisualizationBase, UIVisualizationConfig } from '../ui-visualization.base';
import { UITableColumn } from './ui-table.interface';

@Component({
	selector: 'ui-table',
	template: `
		<ui-visualization (dimensionChange)="handleDimensionChange($event)">
			<ng-template #vis>
				<nz-table
					*ngIf="config && viewDimensions"
					#uiTable
					nzBordered
					[nzTitle]="displayOptions.title"
					[nzSize]="displayOptions.tableSize || 'small'"
					[nzData]="filteredData"
					[nzPageSize]="displayOptions.defaultPageSize || 5"
					[nzPageSizeOptions]="[5, 10, 25, 100]"
					[nzShowSizeChanger]="true"
					[nzShowQuickJumper]="false"
					[nzScroll]="getScrollObject()"
				>
					<thead (nzSortChange)="sort($event)">
						<tr>
							<th
								*ngFor="let column of displayOptions.columns"
								[nzWidth]="column.width"
								[nzColumnKey]="column.prop || column.name"
								nzShowSort
								[nzShowFilter]="!displayOptions.hideFilter"
								[nzFilters]="filterMap[column.prop]"
								(nzFilterChange)="filter($event, column.prop)"
							>
								{{ column.name || utils.prettyPrint(column.prop) }}
							</th>

							<th *ngIf="displayOptions.showAdd">
								<button
									nz-button
									class="bg-primary text-white d-flex justify-content-center align-items-center h-100 w-100"
									(click)="rowAdd.emit(true)"
									title="Add a row..."
								>
									<i
										nz-icon
										nzType="file-add"
										nzTheme="outline"
										class="w-100"
									></i>
								</button>
							</th>
						</tr>
					</thead>

					<tbody>
						<tr *ngFor="let d of uiTable.data">
							<td
								*ngFor="let column of displayOptions.columns"
								(click)="handleCellClick(d, column)"
								[style.background-color]="
									column.styleBackground
										? utils.getColorForPercentage(d[column.prop || column.name])
										: ''
								"
							>
								<ng-container *ngIf="!column.styleBackground">
									{{ getCellData(d, column) }}
								</ng-container>
							</td>

							<td *ngIf="displayOptions.showDelete">
								<button
									nz-button
									class="bg-danger text-white w-100 d-flex justify-content-center align-items-center"
									(click)="rowDelete.emit(d)"
									title="Delete this row..."
								>
									<i nz-icon nzType="delete" nzTheme="outline"></i>
								</button>
							</td>
						</tr>
					</tbody>
				</nz-table>
			</ng-template>
		</ui-visualization>
	`,
	styles: [
		`
			tr:hover > td {
				cursor: pointer;
				background-color: rgba(0, 0, 0, 0.1) !important;
				transition: 100ms ease-in-out;
			}

			tr:active > td {
				background-color: rgba(0, 0, 0, 0.15) !important;
				transition: 250ms;
			}
		`
	]
})
export class UITableComponent extends UIVisualizationBase implements OnInit {
	filteredData: any[];
	filterMap: { [propName: string]: { text: any; value: any }[] } = {};

	@Output() rowAdd = new EventEmitter<boolean>();
	@Output() rowDelete = new EventEmitter<any>();
	@Output() cellClicked = new EventEmitter<{ data: any; column: UITableColumn }>();

	constructor(
		public cdRef: ChangeDetectorRef,
		private fs: FilterSortService,
		public utils: UtilityService,
		private datePipe: DatePipe
	) {
		super(cdRef);

		this.configLoaded$.subscribe((config: UIVisualizationConfig) => {
			this.setupTableProperties(config.data);
		});
	}

	ngOnInit(): void {}

	getScrollObject(): { x?: string; y?: string } {
		const scrollObject: { x?: string; y?: string } = {};
		scrollObject.y = `${this.viewDimensions.height - 100}px`;
		return scrollObject;
	}

	getCellData(d: any, column: UITableColumn) {
		let value: any;

		const subProps = column.prop.split('.');
		if (subProps.length > 1) {
			// TODO: Make this recursive
			const parentObj = d[subProps[0]];
			if (Array.isArray(parentObj)) {
				value = parentObj.map((o) => o[subProps[1]]);
			} else {
				value = parentObj[subProps[1]];
			}
		} else {
			value = d[column.prop || column.name];
		}

		const isDate = column.type && (column.type === 'date' || column.type === 'datepicker');
		const isArray = Array.isArray(value);

		if (isDate) {
			return this.datePipe.transform(value, column.dateStyle || 'shortDate');
		} else if (isArray) {
			return value.join(',');
		} else {
			return value;
		}
	}

	setupTableProperties(d: any[]) {
		if (!d || !(this.displayOptions || this.displayOptions.columns)) return;

		this.filteredData = d;

		(this.displayOptions.columns || []).forEach((column: UITableColumn) => {
			this.filterMap[column.prop || column.name] = this.createFilterList(
				d,
				column.prop || column.name
			);
		});
	}

	sort(sort: { key: string; value: string }): void {
		this.filteredData = this.fs.sort(
			this.filteredData,
			sort.key,
			sort.value === 'ascend' ? false : true
		);
	}

	filter(filterList: string[], filterProp: string) {
		if (!filterList.length) {
			return [...this.data];
		}

		this.filteredData = [];
		filterList.forEach((filter) => {
			this.filteredData = [
				...this.filteredData,
				...this.fs.search(this.data, filter, filterProp)
			];
		});
	}

	createFilterList(array, prop) {
		const uniqueValues = {};
		array.map((p) => {
			uniqueValues[p[prop]] = '';
		});
		return Object.keys(uniqueValues)
			.sort()
			.map((v) => {
				return {
					text: v,
					value: v
				};
			});
	}

	handleCellClick(data: any, column: UITableColumn) {
		this.itemClicked.emit(data);
		this.cellClicked.emit({ data, column });
	}
}
