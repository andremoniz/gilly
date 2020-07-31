import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppLayoutModule } from '@lib/app-shell';

import { AppShellModule } from '../../../../libs/app-shell/src/lib/app-shell.module';
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

		AppShellModule.forRoot({
			serverEndpoint: environment.serverUrl,
			dataEndpoint: environment.dataUrl,
			securityEndpoint: environment.authUrl,
			appName: environment.appTitle,
			userMetrics: environment.userMetrics
		}),
		AppLayoutModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
