import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageContainerModule } from '@lib/app-shell';
import { NzCardModule } from 'ng-zorro-antd';

import {
	DataImporterComponent,
	DataImporterModule,
	ExportManagerComponent,
	ExportManagerModule
} from '../../../../../../libs/data/src';
import { environment } from '../../../environments/environment';
import { DataToolsComponent } from './data-tools.component';

@NgModule({
	declarations: [DataToolsComponent],
	imports: [
		CommonModule,

		NzCardModule,

		PageContainerModule,

		ExportManagerModule,
		DataImporterModule,

		RouterModule.forChild([
			{
				path: '',
				component: DataToolsComponent
			},
			{
				path: 'export-manager',
				component: ExportManagerComponent,
				data: {
					breadcrumb: 'Export Manager',
					targetApi: environment.dataUrl
				}
			},
			{
				path: 'data-importer',
				component: DataImporterComponent,
				data: {
					breadcrumb: 'Data Importer',
					targetApi: environment.dataUrl
				}
			}
		])
	],
	exports: [DataToolsComponent],
	providers: []
})
export class DataToolsModule {}
