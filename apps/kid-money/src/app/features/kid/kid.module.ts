import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PageContainerModule } from '@lib/app-shell';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';

import { KidMoneyCardComponent } from './kid-money-card/kid-money-card.component';
import { KidToolbarComponent } from './kid-toolbar/kid-toolbar.component';
import { KidTransactionCardComponent } from './kid-transaction-card/kid-transaction-card.component';
import { KidTransactionInfoComponent } from './kid-transaction-card/kid-transaction-info.component';
import { KidComponent } from './kid.component';

@NgModule({
	declarations: [
		KidComponent,
		KidToolbarComponent,
		KidMoneyCardComponent,
		KidTransactionCardComponent,
		KidTransactionInfoComponent
	],
	imports: [
		CommonModule,
		FormsModule,

		ToolbarModule,
		ButtonModule,
		CardModule,
		DataViewModule,
		PanelModule,
		DialogModule,
		DropdownModule,
		InputTextModule,

		PageContainerModule,

		RouterModule.forChild([
			{ path: '', component: KidComponent },
			{ path: ':id', component: KidComponent }
		])
	],
	exports: [],
	providers: []
})
export class KidModule {}
