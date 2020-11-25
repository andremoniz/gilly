import { DatePipe } from '@angular/common';
import {
	ChangeDetectorRef,
	Component,
	EventEmitter,
	OnInit,
	Output,
	ViewChild
} from '@angular/core';
import { FilterSortService } from 'libs/utilities/src/lib/services/filter-sort.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';

import { isDate } from '../../../../../utilities/src/lib/utilities/dates/isDate';
import { uuidv4 } from '../../../../../utilities/src/lib/utilities/uuidv4';
import { UIVisualizationBase } from '../ui-visualization.base';
import { UtilityService } from '../../../../../utilities/src/lib/services/utility.service';
import { getUniqueValues } from '../../../../../utilities/src/lib/utilities/arrays/getUniqueValues';
import { UIVisualizationConfig } from '../ui-visualization.base';
import { UITableColumn } from './ui-table.interface';

@Component({
	selector: 'ui-table',
	template: `
		<ui-visualization (dimensionChange)="handleDimensionChange($event)">
			<ng-template #vis>
				<p-table
					*ngIf="config && viewDimensions"
					#uiTable
					[value]="filteredData"
					[rows]="displayOptions.defaultPageSize || 5"
					[showCurrentPageReport]="true"
					[rowsPerPageOptions]="[5, 10, 25, 50, 100, 250]"
					[paginator]="true"
					currentPageReportTemplate="{first} to {last} of {totalRecords}"
					[filterDelay]="0"
					[globalFilterFields]="columnProps"
					[scrollable]="true"
					[rowHover]="true"
					[resizableColumns]="true"
					[scrollHeight]="viewDimensions.height - 100 + 'px'"
					sortMode="multiple"
					styleClass="p-datatable-gridlines p-datatable-sm pb-1"
					editMode="row"
				>
					<ng-template pTemplate="caption">
						<div
							class="table-header d-flex justify-content-between"
							*ngIf="displayOptions.title || displayOptions.showSearch"
						>
							<h4 class="text-white">
								{{ displayOptions?.title }}
							</h4>
							<span class="p-input-icon-left" *ngIf="displayOptions.showSearch">
								<i class="pi pi-search"></i>
								<input
									pInputText
									type="text"
									(input)="uiTable.filterGlobal($event.target.value, 'contains')"
									placeholder="Search..."
								/>
							</span>
						</div>
					</ng-template>

					<ng-template pTemplate="header">
						<tr>
							<th
								*ngFor="let column of displayOptions.columns"
								[pSortableColumn]="column.prop"
							>
								{{ column.name || column.prop | prettyPrint }}
								<p-sortIcon [field]="column.prop"></p-sortIcon>
							</th>

							<th
								*ngIf="displayOptions.showAdd || displayOptions.showEdit"
								style="width:6rem;"
							>
								<button
									pButton
									pRipple
									type="button"
									icon="pi pi-plus"
									label="Add"
									title="Add a row..."
									class=""
									(click)="onRowAdd()"
								></button>
							</th>
						</tr>
						<tr>
							<th *ngFor="let column of displayOptions.columns">
								<ng-container [ngSwitch]="column.type">
									<div *ngSwitchCase="'date'">
										<!-- <p-calendar
											(onSelect)="handleDateFilter($event, column.prop)"
											(onClearClick)="
												uiTable.filter($event, column.prop, 'contains')
											"
											styleClass="p-column-filter"
											dateFormat="mm/dd/yy"
											appendTo="body"
										></p-calendar> -->

										<input
											pInputText
											type="text"
											styleClass="p-column-filter"
											(input)="
												uiTable.filter(
													$event.target.value,
													column.prop,
													'contains'
												)
											"
										/>
									</div>

									<div *ngSwitchDefault>
										<p-multiSelect
											*ngIf="filterOptions"
											[options]="filterOptions[column.prop]"
											(onChange)="onFilterChange($event, column.prop)"
											styleClass="p-column-filter"
											appendTo="body"
										>
										</p-multiSelect>
									</div>
								</ng-container>
							</th>
						</tr>
					</ng-template>

					<ng-template pTemplate="body" let-data let-editing="editing" let-ri="rowIndex">
						<tr
							[pEditableRow]="data"
							(mouseover)="itemHovered.emit(data)"
							(mouseout)="itemHovered.emit(null)"
							[id]="'ui_table_' + data.id"
						>
							<td
								*ngFor="let column of displayOptions.columns"
								(click)="handleCellClick(data, column)"
								class="clickable"
								pEditableColumn
								[style.backgroundColor]="
									displayOptions &&
									displayOptions.dataDrivenColorMap &&
									displayOptions.dataDrivenColorMap[column.prop || column.name] &&
									displayOptions.dataDrivenColorMap[column.prop || column.name][
										data[column.prop || column.name]
									]
										? displayOptions.dataDrivenColorMap[
												column.prop || column.name
										  ][data[column.prop || column.name]].color
										: ''
								"
								[style.color]="
									displayOptions &&
									displayOptions.dataDrivenColorMap &&
									displayOptions.dataDrivenColorMap[column.prop || column.name] &&
									displayOptions.dataDrivenColorMap[column.prop || column.name][
										data[column.prop || column.name]
									] &&
									displayOptions.dataDrivenColorMap[column.prop || column.name][
										data[column.prop || column.name]
									].color
										? (displayOptions.dataDrivenColorMap[
												column.prop || column.name
										  ][data[column.prop || column.name]].color
										  | pickTextColorBasedOnBackgroundColor)
										: 'black'
								"
							>
								<ng-container *ngIf="!column.styleBackground">
									<p-cellEditor
										*ngIf="displayOptions.showEdit && isEditing; else viewCell"
									>
										<ng-template pTemplate="input">
											<input pInputText [(ngModel)]="data[column.prop]" />
										</ng-template>
										<ng-template pTemplate="output">
											{{ getCellData(data, column) }}
										</ng-template>
									</p-cellEditor>

									<ng-template #viewCell>
										<div
											*ngIf="column.type === 'link'; else defaultCell"
											[innerHtml]="getCellData(data, column)"
										></div>
										<ng-template #defaultCell>
											{{ getCellData(data, column) }}
										</ng-template>
									</ng-template>
								</ng-container>
							</td>

							<td *ngIf="displayOptions.showEdit" style="width:6rem;">
								<button
									*ngIf="!editing"
									pButton
									pRipple
									type="button"
									pInitEditableRow
									icon="pi pi-pencil"
									class="p-button-rounded p-button-text p-mr-2"
									(click)="onRowEditInit(data)"
								></button>
								<button
									*ngIf="!editing"
									pButton
									pRipple
									type="button"
									icon="pi pi-trash"
									class="p-button-rounded p-button-text p-button-danger"
									(click)="rowDelete.emit(data)"
								></button>

								<button
									*ngIf="editing"
									pButton
									pRipple
									type="button"
									pSaveEditableRow
									icon="pi pi-check"
									(click)="onRowEditSave(data)"
									class="p-button-rounded p-button-text p-button-success p-mr-2"
								></button>
								<button
									*ngIf="editing"
									pButton
									pRipple
									type="button"
									pCancelEditableRow
									icon="pi pi-times"
									class="p-button-rounded p-button-text p-button-danger"
								></button>
							</td>
						</tr>
					</ng-template>

					<ng-template pTemplate="emptymessage">
						No data found...
					</ng-template>
				</p-table>
			</ng-template>
		</ui-visualization>
	`,
	styles: [
		`
			::ng-deep .p-datatable-header {
				padding: 0rem !important;
			}

			::ng-deep .p-datatable-scrollable-header-box {
				padding-right: 0rem !important;
			}

			:host ::ng-deep .p-cell-editing {
				padding-top: 0 !important;
				padding-bottom: 0 !important;
			}

			.table-header {
				padding: 0.5rem;
				background-color: var(--primary-color);
				color: white !important;
				align-items: center;
			}

			.external-highlight {
				border: 2px solid var(--primary-color);
				transition: border-color 1000ms cubic-bezier(0.075, 0.82, 0.165, 1) !important;
			}
		`
	],
	providers: [UtilityService, DatePipe]
})
export class UITableComponent extends UIVisualizationBase implements OnInit {
	@ViewChild('uiTable') table: Table;

	filteredData: any[];
	filterOptions: { [prop: string]: { value: string; label: string }[] };
	columnProps: string[];

	@Output() rowAdd = new EventEmitter<any>();
	@Output() rowSave = new EventEmitter<any>();
	@Output() rowDelete = new EventEmitter<any>();
	@Output() cellClicked = new EventEmitter<{ data: any; column: UITableColumn }>();

	tempEditData: { [s: string]: any } = {};

	isEditing: boolean = false;

	private internalRowHovered: any;

	constructor(
		public cdRef: ChangeDetectorRef,
		private datePipe: DatePipe,
		private fs: FilterSortService,
		private dialogConfig: DynamicDialogConfig
	) {
		super(cdRef);

		this.configLoaded$.subscribe((config: UIVisualizationConfig) => {
			this.setupTableProperties(config.data);
		});

		this.hoveredItemInternalSet$.subscribe((item) => {
			if (!item) {
				const rowEl = document.getElementById(`ui_table_${this.internalRowHovered.id}`);
				if (!rowEl) return;
				rowEl.classList.remove('external-highlight');
				this.internalRowHovered = null;
			} else {
				this.internalRowHovered = item;
				const rowEl = document.getElementById(`ui_table_${item.id}`);
				if (!rowEl) return;
				rowEl.classList.add('external-highlight');
			}
		});

		if (this.dialogConfig && this.dialogConfig.data) {
			this.data = this.dialogConfig.data.data;
			this.displayOptions = this.dialogConfig.data.displayOptions;
		}
	}

	ngOnInit(): void {}

	setupTableProperties(d: any[]) {
		if (!d || !(this.displayOptions || this.displayOptions.columns)) return;

		this.filteredData = d;

		this.columnProps = this.displayOptions.columns.map((c) => c.prop);

		if (this.displayOptions.defaultSortProp) {
			this.fs.sortInPlace(
				d,
				this.displayOptions.defaultSortProp,
				this.displayOptions.defaultSortDirection &&
					this.displayOptions.defaultSortDirection === 'desc',
				this.displayOptions.columns.find(
					(c) => c.prop === this.displayOptions.defaultSortProp
				)?.type === 'date'
			);
		}

		this.setupFilters();
	}

	private setupFilters() {
		this.filterOptions = {};

		this.displayOptions.columns.forEach((c) => {
			this.filterOptions[c.prop] = getUniqueValues(this.filteredData, c.prop).map((v) => ({
				value: v,
				label: v
			}));
		});
	}

	getCellData(d: any, column: UITableColumn) {
		let value: any;

		if (!column.prop) return d;

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

		const isCellDate =
			(column.type && (column.type === 'date' || column.type === 'datepicker')) ||
			isDate(value);
		const isCellArray = Array.isArray(value);
		const isCellLink = column.type && column.type === 'link';

		if (isCellDate) {
			return this.datePipe.transform(value, column.dateStyle || 'shortDate');
		} else if (isCellArray) {
			return value.join(',');
		} else if (isCellLink) {
			return value ? `<a href="${value}" target="_blank">${value}</a>` : '';
		} else {
			return value;
		}
	}

	handleCellClick(data: any, column: UITableColumn) {
		this.itemClicked.emit(data);
		this.cellClicked.emit({ data, column });

		if (this.dialogConfig?.data?.itemClickedHandler) {
			this.dialogConfig?.data.itemClickedHandler(data);
		}
	}

	onFilterChange(event, prop) {
		this.table.filter(event.value, prop, 'in');
	}

	onRowAdd() {
		const d = { _tempId: uuidv4() };
		this.rowAdd.emit(d);
	}

	onRowEditSave(d: any) {
		delete this.tempEditData[d._tempId];
		this.isEditing = false;
		this.rowSave.emit(d);
	}

	onRowEditInit(d: any) {
		this.tempEditData[d._tempId] = { ...d };
		this.isEditing = true;
	}

	onRowEditCancel(d: any, index: number) {
		this.filteredData[index] = this.tempEditData[d._tempId];
		this.isEditing = false;
		delete this.tempEditData[d._tempId];
	}
}
