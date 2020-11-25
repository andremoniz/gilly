import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';

import { PageContainerModule } from './../page-container/page-container.module';
import { AppLayoutComponent } from './app-layout.component';
import { HeaderItemComponent } from './header/header-item.component';

@NgModule({
	declarations: [AppLayoutComponent, HeaderItemComponent],
	imports: [
		CommonModule,
		RouterModule,

		ButtonModule,
		MenuModule,
		ToastModule,
		RippleModule,

		PageContainerModule
	],
	exports: [AppLayoutComponent],
	providers: [MessageService]
})
export class AppLayoutModule {}
