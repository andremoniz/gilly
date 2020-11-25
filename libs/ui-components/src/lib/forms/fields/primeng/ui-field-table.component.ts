import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { deepClone } from '@sof/utilities';
import { takeUntil } from 'rxjs/operators';

import { UIFieldBase } from '../ui-field.base';
import { EntityFieldConfig } from './../../../../../../entities/entity-field-config';
import { prettyPrint } from './../../../../../../utilities/src/lib/utilities/strings/prettyPrint';
import { uuidv4 } from './../../../../../../utilities/src/lib/utilities/uuidv4';
import { UIFormConfigService } from './../../ui-form-config.service';
import { arrayFieldTypes, dateFieldTypes, UIFieldConfig } from './../ui-field.base';

@Component({
	selector: 'ui-field-table',
	template: `
		<h5 class="w-100 p-2 bg-dark text-white mt-1" *ngIf="config.field.label">
			{{ config.field.label }}
		</h5>

		<p-table
			#editTable
			styleClass="p-datatable-gridlines p-datatable-sm"
			[value]="tableData"
			[rowHover]="true"
			[globalFilterFields]="columnKeys"
			[filterDelay]="0"
			[paginator]="true"
			[rows]="10"
			[rowsPerPageOptions]="[5, 10, 25, 50, 100]"
			[showCurrentPageReport]="true"
			currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
			[resizableColumns]="true"
		>
			<ng-template pTemplate="header">
				<tr>
					<th [pSortableColumn]="column.key" *ngFor="let column of columns">
						{{ column.label }} <p-sortIcon [field]="column.key"></p-sortIcon>
					</th>
					<th class="action-cell">
						<button
							pButton
							pRipple
							type="button"
							icon="pi pi-plus"
							title="Add a row..."
							(click)="handleRowAdd()"
						></button>
					</th>
				</tr>
			</ng-template>

			<ng-template pTemplate="body" let-item let-rowIndex="rowIndex" let-editing="editing">
				<tr>
					<td pEditableColumn *ngFor="let column of columns; let columnIndex = index">
						<p-cellEditor>
							<ng-template pTemplate="input">
								<ng-container
									dynamicField
									[config]="fieldMap[rowIndex + '_' + columnIndex]"
								></ng-container>
							</ng-template>
							<ng-template pTemplate="output">
								<div
									[style.backgroundColor]="
										column.type === 'colorpicker'
											? fieldMap[rowIndex + '_' + columnIndex].control &&
											  fieldMap[rowIndex + '_' + columnIndex].control.value
											: ''
									"
								>
									{{ getCellDisplay(rowIndex, columnIndex, column) }}
								</div>
							</ng-template>
						</p-cellEditor>
					</td>
					<td class="action-cell">
						<button
							pButton
							pRipple
							type="button"
							icon="pi pi-trash"
							title="Delete this row..."
							class="p-button-outlined p-button-danger"
							(click)="handleRowDelete(item, rowIndex)"
						></button>
					</td>
				</tr>
			</ng-template>

			<ng-template pTemplate="emptymessage">
				No data found...
			</ng-template>
		</p-table>
	`,
	styles: [
		`
			.action-cell {
				width: 3.5rem;
				padding: 0.25rem !important;
			}

			td {
				padding: 0.5rem !important;
			}

			div + .p-datatable-header {
				padding: 0.5rem !important;
			}
		`
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UIFieldTablePrimeNGComponent extends UIFieldBase {
	columns: EntityFieldConfig[];
	columnKeys: string[];

	fieldMap: { [key: string]: UIFieldConfig } = {};

	tableData: any[];
	formArrayRef: FormArray;

	constructor(
		private formConfigService: UIFormConfigService,
		private fb: FormBuilder,
		private datePipe: DatePipe
	) {
		super();

		this.configLoaded$.pipe(takeUntil(this.unsubscribe)).subscribe((c: UIFieldConfig) => {
			this.formArrayRef = <FormArray>c.control;
			this.tableData = deepClone(this.formArrayRef.value);

			this.columns = (c.field.tableConfig || [])
				.sort((a, b) => (a.order === b.order ? 0 : a.order > b.order ? 1 : -1))
				.map((f) => {
					return {
						...f,
						label: prettyPrint(f.label || f.key)
					};
				});

			this.formArrayRef.controls.forEach((control) => {
				// tom foolery to coerce arrays into form array
				this.columns.forEach((column) => {
					if (arrayFieldTypes.includes(column.type)) {
						control = this.fb.array(control.get(column.key).value || []);
					}
				});
			});

			this.columnKeys = this.columns.map((c) => c.key);

			this.setupFieldMap();
		});
	}

	getCellDisplay(rowIndex: number, columnIndex: number, column: EntityFieldConfig) {
		const control = this.fieldMap[`${rowIndex}_${columnIndex}`].control;
		const value =
			control && control.value && (control.value.optLabel || control.value.label)
				? control.value.optLabel || control.value.label
				: control
				? control.value
				: '';

		if (dateFieldTypes.includes(column.type)) {
			return this.datePipe.transform(value, 'shortDate');
		} else if (arrayFieldTypes.includes(column.type)) {
			return value ? value.join(', ') : '';
		} else {
			return value;
		}
	}

	handleRowAdd() {
		const newItem = { _tempId: uuidv4() };
		this.columns.forEach((column: EntityFieldConfig) => (newItem[column.key] = null));

		const newItemControl = this.formConfigService.createFormFromConfig(this.columns, newItem);
		delete newItemControl.controls.id;

		this.columns.forEach((column: EntityFieldConfig, columnIndex: number) => {
			this.createFieldMapEntry(
				this.formArrayRef.length,
				columnIndex,
				column,
				newItemControl.get(column.key)
			);
		});
		this.formArrayRef.push(newItemControl);
		this.tableData.push(newItem);
		this.tableData = [...this.tableData];
	}

	handleRowDelete(item: any, rowIndex: number) {
		this.formArrayRef.removeAt(rowIndex);
		this.tableData.splice(rowIndex, 1);
		this.tableData = [...this.tableData];
		this.setupFieldMap();
	}

	private setupFieldMap() {
		this.formArrayRef.controls.forEach((control, controlIndex) => {
			this.columns.forEach((column, columnIndex) => {
				this.createFieldMapEntry(
					controlIndex,
					columnIndex,
					column,
					arrayFieldTypes.includes(column.type)
						? this.fb.array(control.get(column.key).value || [])
						: control.get(column.key)
				);
			});
		});
	}

	private createFieldMapEntry(rowIndex, columnIndex, field, control) {
		this.fieldMap[`${rowIndex}_${columnIndex}`] = {
			field,
			control
		};
	}
}
