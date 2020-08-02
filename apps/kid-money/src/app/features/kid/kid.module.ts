import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PageContainerModule } from '@lib/app-shell';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { EditKidComponent } from './edit-kid/edit-kid.component';
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
		KidTransactionInfoComponent,
		EditKidComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,

		ToolbarModule,
		ButtonModule,
		CardModule,
		DataViewModule,
		PanelModule,
		DialogModule,
		DropdownModule,
		InputTextModule,
		CalendarModule,
		InputTextareaModule,
		InputNumberModule,
		FileUploadModule,
		ToastModule,

		PageContainerModule,

		RouterModule.forChild([
			{ path: '', component: KidComponent },
			{ path: ':id', component: KidComponent },
			{ path: ':id/edit', component: EditKidComponent, data: { breadcrumb: 'Edit Kid' } }
		])
	],
	exports: [],
	providers: [MessageService]
})
export class KidModule {}
