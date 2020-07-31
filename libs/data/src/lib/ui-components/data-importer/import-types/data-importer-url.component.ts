import { HttpHeaders } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import {
	UITableColumn,
	UITableDisplayOptions
} from '../../../../../../ui-components/src/lib/visualization/table/ui-table.interface';
import { UtilityService } from '../../../../../../utilities/src/lib/services/utility.service';
import { DataImporterService } from '../data-importer.service';
import { AbstractDataImporterType } from './data-importer-type.abstract';
import { getUniqueProps } from '@lib/utilities';

@Component({
	selector: 'data-importer-url',
	template: `
		<div class="">
			<h4><b>STEP 1</b> Insert URL to Query (JSON Only)</h4>
		</div>

		<div class="mt-3">
			<div class="w-100">
				<label>URL</label>
				<input nz-input type="text" [(ngModel)]="urlToQuery" />
			</div>

			<nz-collapse [nzBordered]="false" class="w-100">
				<nz-collapse-panel [nzHeader]="'URL Headers & Options'">
					<label [title]="'Token for querying this URL'">Authorization Token</label>
					<input nz-input type="text" [(ngModel)]="headers.authorizationToken" />
				</nz-collapse-panel>
			</nz-collapse>
		</div>

		<div class="mt-1 d-flex justify-content-end">
			<button
				nz-button
				class="bg-secondary text-white mr-3"
				[disabled]="!dataInput"
				(click)="setDataInput(null)"
			>
				Clear Response
			</button>
			<button
				nz-button
				(click)="queryUrl()"
				class="bg-primary text-white mr-3"
				[disabled]="!urlToQuery || isQuerying"
			>
				Query URL
			</button>
		</div>

		<nz-progress
			[nzPercent]="100"
			[nzShowInfo]="false"
			[nzStrokeColor]="{ '0%': '#108ee9', '100%': '#87d068' }"
			nzStatus="active"
			*ngIf="isQuerying"
			class="w-100"
		></nz-progress>

		<ui-table [data]="dataInput" [displayOptions]="tableOptions" *ngIf="tableOptions && dataInput"></ui-table>
	`
})
export class DataImporterURLComponent extends AbstractDataImporterType implements OnInit {
	dataInput: any[];

	isQuerying: boolean = false;

	urlToQuery: string;

	headers: any = {};

	uniqueProps: any[];
	tableOptions: UITableDisplayOptions;

	constructor(public DIS: DataImporterService, private utilityService: UtilityService) {
		super();
	}

	ngOnInit() {}

	isImportDataValid(): boolean {
		return true;
	}

	setDataInput(data: any) {
		try {
			if (!data) {
				this.dataInput = null;
				this.uniqueProps = null;
				this.tableOptions = null;
				this.DIS.setDataInput(null, null);
			}
			let parsedData;
			if (typeof data === 'object') {
				if (Array.isArray(data)) {
					parsedData = data;
				} else {
					parsedData = [data];
				}
			} else {
				parsedData = JSON.parse(data);
			}
			this.uniqueProps = getUniqueProps(parsedData);
			this.tableOptions = this.getTableDisplayProps(this.uniqueProps);
			this.DIS.setDataInput(parsedData, this.uniqueProps);
			this.dataInput = parsedData;
		} catch (e) {
			this.DIS.setDataInput([], []);
		}
	}

	getTableDisplayProps(uniqueProps) {
		const columns: UITableColumn[] = uniqueProps.map((p) => {
			return {
				name: this.utilityService.prettyPrint(p),
				prop: p
			};
		});
		return {
			title: 'Response Preview',
			columns: columns
		};
	}

	async queryUrl() {
		this.isQuerying = true;
		this.DIS.queryUrl(
			this.urlToQuery,
			this.headers.authorizationToken
				? new HttpHeaders({
						'Content-Type': 'application/json',
						Authorization: `Bearer ${this.headers.authorizationToken}`
				  })
				: null
		)
			.pipe(take(1))
			.subscribe((res) => {
				this.setDataInput(res);
				this.isQuerying = false;
			});
	}
}
