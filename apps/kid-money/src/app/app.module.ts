import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppLayoutModule, AppShellModule, PageContainerModule } from '@lib/app-shell';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,

		AppRoutingModule,
		HttpClientModule,

		CardModule,
		ButtonModule,

		AppShellModule.forRoot({
			serverEndpoint: environment.serverUrl,
			dataEndpoint: environment.dataUrl,
			securityEndpoint: environment.authUrl,
			appName: environment.appTitle,
			userMetrics: environment.userMetrics
		}),
		AppLayoutModule,
		PageContainerModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
