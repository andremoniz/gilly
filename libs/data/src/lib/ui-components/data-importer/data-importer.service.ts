import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { getUniqueProps } from '@lib/utilities';
import { Observable, Subject } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';

import { DataService } from '../../services/data/data.service';

@Injectable()
export class DataImporterService {
	importTypes = ['Delimited', 'Excel', 'JSON', 'URL', 'XML'];
	selectedImportType;

	dataInput: any;
	parsedDataInput: any[] = [];

	uniqueProps: any[] = [];
	propFormGroup: FormGroup;

	dataUploading: boolean = false;

	targetApi: string = '';
	disableUpload: boolean = false;
	targetTable: string;
	tables: string[] = [];
	disableTableSelection: boolean = false;
	availableTableFields: string[];
	selectedTableFields: string[];
	tableFieldSelected$ = new Subject();

	uploadComplete$ = new Subject();
	transformedData: any[] = [];

	constructor(private dataService: DataService) {}

	importTypeChange(event) {
		this.dataInput = null;
		this.uniqueProps = null;
	}

	setDataInput(data, props) {
		this.dataInput = [...data];
		this.uniqueProps = [...props];
		this.propFormGroup = this.buildPropFormGroup(this.uniqueProps);
	}

	buildPropFormGroup(props: string[]) {
		let group: any = {};
		props.forEach((p) => {
			group[p] = new FormControl();
		});
		return new FormGroup(group);
	}

	selectField(event: any) {
		const selectedField = event;
		this.selectedTableFields = this.getSelectedFields();
		this.tableFieldSelected$.next(this.selectedTableFields);
	}

	getSelectedFields() {
		const propFieldMap = this.propFormGroup.value;
		let selectedFields = [];
		Object.keys(propFieldMap).forEach((prop) =>
			propFieldMap[prop] ? selectedFields.push(propFieldMap[prop]) : ''
		);
		return selectedFields;
	}

	getPropForField(field) {
		const propFieldMap = this.propFormGroup.value;
		let foundProp = '';
		Object.keys(propFieldMap).forEach((prop) => {
			if (propFieldMap[prop] === field) {
				foundProp = prop;
			}
		});
		return foundProp;
	}

	calculateTargetTableFields(table) {
		if (!this.availableTableFields) {
			this.dataService
				.readExternal(`${this.targetApi}/${table}`)
				.pipe(debounceTime(1000), take(1))
				.subscribe((res) => {
					this.availableTableFields = getUniqueProps(res);
				});
		}
	}

	async uploadData() {
		this.dataUploading = true;

		const fields = this.getSelectedFields();
		const propFieldMap = {};
		fields.forEach((f) => (propFieldMap[f] = this.getPropForField(f)));

		this.transformedData = [];
		this.dataInput.forEach((o) => {
			let transObj: any = {};
			Object.keys(propFieldMap).forEach(
				(fieldName) => (transObj[fieldName] = o[propFieldMap[fieldName]])
			);
			this.transformedData.push(transObj);
		});

		if (this.targetApi && !this.disableUpload) {
			this.dataService
				.save(this.targetTable, this.transformedData)
				.pipe(take(1))
				.subscribe((res) => {
					this.uploadComplete$.next(true);
					this.dataUploading = false;
				});
		} else {
			this.uploadComplete$.next(true);
			this.dataUploading = false;
		}
	}

	queryUrl(url: string, headers?: any): Observable<any> {
		return this.dataService.readExternal(url, headers);
	}
}
