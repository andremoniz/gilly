import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';

import { CoreModule } from '../../core/core.module';
import { PageContainerModule } from './../../../../../../libs/app-shell/src/lib/components/page-container/page-container.module';
import { UIFormModule } from './../../../../../../libs/ui-components/src/lib/forms/ui-form.module';
import { EditKidComponent } from './edit-kid/edit-kid.component';
import { EditTransactionComponent } from './edit-transaction/edit-transaction.component';
import { KidToolbarComponent } from './kid-toolbar/kid-toolbar.component';
import { KidTransactionCardComponent } from './kid-transaction-card/kid-transaction-card.component';
import { KidTransactionInfoComponent } from './kid-transaction-card/kid-transaction-info.component';
import { KidComponent } from './kid.component';

@NgModule({
	declarations: [
		KidComponent,
		KidToolbarComponent,
		KidTransactionCardComponent,
		KidTransactionInfoComponent,
		EditKidComponent,
		EditTransactionComponent
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
		OverlayPanelModule,

		PageContainerModule,
		UIFormModule,

		CoreModule,

		RouterModule.forChild([
			{ path: '', component: KidComponent },
			{ path: ':id', component: KidComponent },
			{ path: ':id/edit', component: EditKidComponent, data: { breadcrumb: 'Edit Kid' } },
			{
				path: ':id/transaction',
				component: EditTransactionComponent,
				data: { breadcrumb: 'Create Transaction' }
			},
			{
				path: ':id/transaction/:tid',
				component: EditTransactionComponent,
				data: { breadcrumb: 'Edit Transaction' }
			}
		])
	],
	exports: [],
	providers: [MessageService]
})
export class KidModule {}
