import { Component, OnInit } from '@angular/core';

import { DataImporterService } from './data-importer.service';

@Component({
	selector: 'data-importer-output',
	template: `
		<div class="w-100 border-bottom pb-3 mb-3">
			<div class="d-flex justify-content-between mb-1">
				<h3>Target Table</h3>
				<button
					nz-button
					class="bg-primary text-white"
					(click)="
						dataImporterService.calculateTargetTableFields(
							dataImporterService.targetTable
						)
					"
				>
					Get Target Fields
				</button>
			</div>
			<input
				nz-input
				[(ngModel)]="dataImporterService.targetTable"
				[nzAutocomplete]="auto"
				[disabled]="dataImporterService.disableTableSelection"
			/>
			<nz-autocomplete
				[nzDataSource]="dataImporterService.tables"
				nzBackfill
				#auto
			></nz-autocomplete>
		</div>

		<p class="ml-1" *ngIf="!dataImporterService.targetTable">
			You must select a table to import the data into...
		</p>
		<ng-container *ngIf="dataImporterService.targetTable">
			<h4>
				<b>STEP 2</b> Map {{ dataImporterService.selectedImportType }} Properties / Columns
				to the Target Table Field's
			</h4>

			<div class="table-container">
				<table class="table table-bordered table-condensed w-100 mt-3">
					<thead>
						<tr>
							<th colspan="2">
								{{ dataImporterService.selectedImportType }} Property
							</th>
							<th colspan="1"></th>
							<th colspan="2">{{ dataImporterService.targetTable }} Field</th>
						</tr>
					</thead>
					<tbody
						*ngIf="
							dataImporterService.dataInput &&
							dataImporterService.uniqueProps &&
							dataImporterService.propFormGroup
						"
						[formGroup]="dataImporterService.propFormGroup"
					>
						<tr *ngFor="let prop of dataImporterService.uniqueProps">
							<td colspan="2">{{ prop }}</td>
							<td class="d-flex justify-content-center">🢂</td>
							<td colspan="2">
								<nz-select
									class="w-100"
									*ngIf="dataImporterService.targetTable"
									[formControlName]="prop"
									placeholder="Select a field to map the property to"
									(ngModelChange)="dataImporterService.selectField($event)"
								>
									<nz-option
										*ngFor="
											let field of dataImporterService.availableTableFields
										"
										[nzValue]="field"
										[nzLabel]="field"
									></nz-option>
								</nz-select>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</ng-container>
	`,
	styles: [
		`
			.table-container {
			}

			table {
				display: flex;
				flex-flow: column;
				height: 100%;
				width: 100%;
			}

			table thead {
				flex: 0 0 auto;
				width: calc(100% - 0.9rem);
			}

			table tbody {
				flex: 1 1 auto;
				display: block;
				overflow-y: auto;
				width: calc(100% - 0.9rem);
			}

			table tbody tr {
				width: 100%;
			}

			table thead,
			table tbody tr {
				display: table;
				table-layout: fixed;
			}
		`
	]
})
export class DataImporterOutputComponent implements OnInit {
	constructor(public dataImporterService: DataImporterService) {}

	ngOnInit(): void {}
}
