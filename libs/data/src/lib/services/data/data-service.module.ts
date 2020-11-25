import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { DataDelete } from './_delete';
import { DataRead } from './_read';
import { DataSave } from './_save';
import { DataService } from './data.service';
import { DataServiceInterceptor } from './interceptors/data-service.interceptor';
import { DataServiceHeaderInterceptor } from './interceptors/header.interceptor';

const configToken = new InjectionToken<DataServiceConfig>('dataServiceConfig');

export interface DataServiceConfig {
	apiEndpoint?: string;
	tables?: any;
}

@NgModule({
	declarations: [],
	imports: [CommonModule, HttpClientModule]
})
export class DataServiceModule {
	constructor(@Optional() @SkipSelf() parentModule: DataServiceModule) {
		if (parentModule) {
			throw new Error(
				'DataServiceModule is already loaded. Import it in the AppModule only.'
			);
		}
	}

	static forRoot(dsConfig: DataServiceConfig): ModuleWithProviders<any> {
		return {
			ngModule: DataServiceModule,
			providers: [
				{ provide: HTTP_INTERCEPTORS, useClass: DataServiceInterceptor, multi: true },
				{ provide: HTTP_INTERCEPTORS, useClass: DataServiceHeaderInterceptor, multi: true },
				{ provide: 'dsConfig', useValue: dsConfig },
				DataService,
				DataSave,
				DataRead,
				DataDelete
			]
		};
	}
}
