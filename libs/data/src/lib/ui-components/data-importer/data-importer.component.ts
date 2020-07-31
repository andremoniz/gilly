import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { take } from 'rxjs/operators';

import { DataImporterService } from './data-importer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'data-importer',
	template: `
		<main
			class="container-wrapper"
			[style.opacity]="dataImporterService.dataUploading ? 0.5 : 1"
			*ngIf="!uploadComplete"
		>
			<div class="container-header border-bottom mb-3">
				<h2 class="p-1 w-25">Data Importer</h2>

				<nz-steps
					[nzCurrent]="currentStep"
					(nzIndexChange)="onIndexChange($event)"
					class="mt-1 ml-3 mr-3 w-100"
				>
					<nz-step nzTitle="Input Data" nzDescription="Insert your data"> </nz-step>
					<nz-step
						nzTitle="Output Mapping"
						nzDescription="Map your data to a table"
						[nzDisabled]="
							!dataImporterService.selectedImportType ||
							!dataImporterService.dataInput
						"
					>
					</nz-step>
					<nz-step
						nzTitle="Preview & Import"
						nzDescription="Preview and complete the import process"
						[nzDisabled]="
							!dataImporterService.selectedImportType ||
							!dataImporterService.dataInput
						"
					>
					</nz-step>
				</nz-steps>
			</div>

			<div class="container-fluid container-main">
				<div class="container-wrapper">
					<div class="container-main" [ngSwitch]="currentStep">
						<data-importer-input
							[style.display]="currentStep === 0 ? 'block' : 'none'"
						></data-importer-input>
						<data-importer-output
							[style.display]="currentStep === 1 ? 'block' : 'none'"
						></data-importer-output>
						<data-importer-preview
							[style.display]="currentStep === 2 ? 'block' : 'none'"
						></data-importer-preview>
					</div>
					<div class="container-footer d-flex">
						<div
							class="ml-auto"
							*ngIf="currentStep === 0 && dataImporterService.dataInput"
						>
							<button nz-button class="bg-primary text-white" (click)="changeStep(1)">
								NEXT
							</button>
						</div>
						<div
							class="ml-auto"
							*ngIf="
								currentStep === 1 &&
								dataImporterService.dataInput &&
								dataImporterService.selectedTableFields &&
								dataImporterService.selectedTableFields.length
							"
						>
							<button
								nz-button
								class="bg-secondary text-white mr-3"
								(click)="changeStep(-1)"
							>
								PREVIOUS
							</button>
							<button nz-button class="bg-primary text-white" (click)="changeStep(1)">
								NEXT
							</button>
						</div>
						<div class="ml-auto" *ngIf="currentStep === 2">
							<button
								nz-button
								class="bg-secondary text-white mr-3"
								(click)="changeStep(-1)"
							>
								PREVIOUS
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>

		<main class="container-wrapper" *ngIf="uploadComplete">
			<data-importer-complete
				(importAgain)="uploadComplete = false"
				(exit)="exit.emit(true)"
			></data-importer-complete>
		</main>
	`,
	styles: [``]
})
export class DataImporterComponent implements OnInit, OnDestroy {
	currentStep = 0;
	disable = false;
	uploadComplete = false;

	@Input()
	set targetTable(tableName: string) {
		this.dataImporterService.targetTable = tableName;
	}
	get targetTable(): string {
		return this.dataImporterService.targetTable;
	}

	@Input()
	set disableTableSelection(disabled: boolean) {
		this.dataImporterService.disableTableSelection = disabled;
	}
	get disableTableSelection(): boolean {
		return this.dataImporterService.disableTableSelection;
	}

	@Input()
	set tables(tables: string[]) {
		this.dataImporterService.tables = tables;
	}
	get tables(): string[] {
		return this.dataImporterService.tables;
	}

	@Input()
	set tableFields(fields: string[]) {
		this.dataImporterService.availableTableFields = fields;
	}
	get tableFields(): string[] {
		return this.dataImporterService.availableTableFields;
	}

	@Input()
	set targetApi(api: string) {
		this.dataImporterService.targetApi = api;
	}
	get targetApi(): string {
		return this.dataImporterService.targetApi;
	}

	@Input()
	set disableUpload(disabled: boolean) {
		this.dataImporterService.disableUpload = disabled;
	}
	get disableUpload(): boolean {
		return this.dataImporterService.disableUpload;
	}

	@Output() transformedData = new EventEmitter<any[]>();
	@Output() exit = new EventEmitter<boolean>();

	constructor(
		public dataImporterService: DataImporterService,
		private router: Router,
		private route: ActivatedRoute
	) {
		if (this.route.snapshot.data) {
			this.targetTable = this.route.snapshot.data.targetTable;
			this.disableTableSelection = this.route.snapshot.data.disableTableSelection;
			this.tables = this.route.snapshot.data.tables;
			this.tableFields = this.route.snapshot.data.tableFields;
			this.targetApi = this.route.snapshot.data.targetApi;
			this.disableUpload = this.route.snapshot.data.disableUpload;
		}
	}

	ngOnInit(): void {
		this.dataImporterService.uploadComplete$.pipe(take(1)).subscribe((res) => {
			this.dataImporterService.selectedImportType = null;
			this.dataImporterService.dataInput = null;
			this.dataImporterService.uniqueProps = null;
			this.dataImporterService.selectedTableFields = null;
			this.currentStep = 0;

			this.uploadComplete = true;

			this.transformedData.emit(this.dataImporterService.transformedData);
		});
	}

	ngOnDestroy() {}

	onIndexChange(index: number) {
		this.currentStep = index;
	}

	changeStep(index) {
		this.currentStep = this.currentStep + index;
	}
}
