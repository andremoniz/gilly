import { Component, OnInit } from '@angular/core';

import { DataImporterService } from './data-importer.service';

@Component({
	selector: 'data-importer-input',
	template: `
		<div class="w-100 border-bottom mb-1">
			<!-- <nz-select
				nzShowSearch
				nzAllowClear
				nzPlaceHolder="Select your import type"
				[(ngModel)]="dataImportService.selectedImportType"
				class="w-100"
			>
				<nz-option
					*ngFor="let importType of dataImportService.importTypes"
					[nzLabel]="importType"
					[nzValue]="importType"
				></nz-option>
			</nz-select> -->
		</div>

		<ng-container [ngSwitch]="dataImportService.selectedImportType">
			<ng-container *ngSwitchCase="'Delimited'">
				<data-importer-delimited></data-importer-delimited>
			</ng-container>
			<ng-container *ngSwitchCase="'Excel'">
				<data-importer-excel></data-importer-excel>
			</ng-container>
			<ng-container *ngSwitchCase="'JSON'">
				<data-importer-json></data-importer-json>
			</ng-container>
			<ng-container *ngSwitchCase="'URL'">
				<data-importer-url></data-importer-url>
			</ng-container>
			<ng-container *ngSwitchCase="'XML'">
				<data-importer-xml></data-importer-xml>
			</ng-container>

			<ng-container *ngSwitchDefault>
				<p>You must select an import type to begin...</p>
			</ng-container>
		</ng-container>
	`,
	styles: [``]
})
export class DataImporterInputComponent implements OnInit {
	constructor(public dataImportService: DataImporterService) {}

	ngOnInit(): void {}
}
