import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameLandingPageComponent } from './landing-page/landing-page.componet';

@NgModule({
	declarations: [AppComponent, GameLandingPageComponent],
	imports: [BrowserModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
