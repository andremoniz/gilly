import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

import { UtilityService } from '../../../../../../utilities/src/lib/services/utility.service';
import { DataImporterService } from '../data-importer.service';
import {
	UITableDisplayOptions,
	UITableColumn
} from './../../../../../../ui-components/src/lib/visualization/table/ui-table.interface';
import { AbstractDataImporterType } from './data-importer-type.abstract';

@Component({
	selector: 'data-importer-excel',
	template: `
		<div class="col-12">
			<h4><b>STEP 1</b> Select an Excel File</h4>
			<h6>Assumes first row is headers; only first sheet will be parsed.</h6>
		</div>

		<div class="col-12 mt-1">
			<input type="file" (change)="fileSelected($event)" />
		</div>

		<div class="col-12 mt-3 mb-5" *ngIf="dataInput && uniqueProps && tableOptions">
			<ui-table [data]="dataInput" [displayOptions]="tableOptions"></ui-table>
		</div>
	`
})
export class DataImporterExcelComponent extends AbstractDataImporterType implements OnInit {
	uniqueProps: string[];
	tableOptions: UITableDisplayOptions;

	constructor(public DIS: DataImporterService, private utilityService: UtilityService) {
		super();
	}

	ngOnInit() {}

	isImportDataValid(): boolean {
		return true;
	}

	setDataInput(data: any) {
		this.dataInput = [];
		try {
			const parsedData = this.parseExcel(data);
			this.DIS.setDataInput(parsedData, this.uniqueProps);
			this.tableOptions = this.getTableDisplayProps(this.uniqueProps);
			this.dataInput = parsedData;
		} catch (e) {
			this.DIS.setDataInput([], []);
		}
	}

	parseExcel(data) {
		let parsedExcel = [];
		this.uniqueProps = [];
		const headerMap = {};

		const wb: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });
		const wsName: string = wb.SheetNames[0];
		const ws: XLSX.WorkSheet = wb.Sheets[wsName];
		const jsonData = <any>XLSX.utils.sheet_to_json(ws, { header: 1 });
		jsonData.forEach((a, i) => {
			if (i === 0) {
				a.forEach((header, headerI) => {
					this.uniqueProps.push(header);
					headerMap[headerI] = header;
				});
			} else {
				const parsedExcelObj = {};
				a.forEach((entity, entityI) => {
					parsedExcelObj[headerMap[entityI]] = entity;
				});
				parsedExcel.push(parsedExcelObj);
			}
		});

		return parsedExcel;
	}

	getTableDisplayProps(uniqueProps) {
		const columns: UITableColumn[] = uniqueProps.map((p) => {
			return {
				name: this.utilityService.prettyPrint(p),
				prop: p
			};
		});
		return {
			title: 'Excel Preview',
			columns: columns
		};
	}

	fileSelected(event) {
		const reader: FileReader = new FileReader();
		reader.onload = () => {
			this.setDataInput(reader.result);
		};
		reader.readAsBinaryString(event.target.files[0]);
	}
}
