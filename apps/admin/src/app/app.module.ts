import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppLayoutModule, AppShellModule, LoginModule } from '@lib/app-shell';
import { NzIconModule } from 'ng-zorro-antd';

import { environment } from '../environments/environment';
import { FormCreatorModule } from './../../../../libs/form-creator/src/lib/form-creator.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,

		AppRoutingModule,

		NzIconModule,

		AppShellModule.forRoot({
			serverEndpoint: environment.serverUrl,
			dataEndpoint: environment.dataUrl,
			securityEndpoint: environment.authUrl,
			appName: environment.appTitle, 
			userMetrics: environment.userMetrics
		}),
		LoginModule,
		AppLayoutModule,

		FormCreatorModule.forRoot({
			dataEndpoint: environment.dataUrl,
			mapOptions: environment.mapOptions
		})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
