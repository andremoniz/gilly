import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,

		RouterModule.forChild([
			{
				path: '',
				loadChildren: () =>
					import('libs/form-creator/src/lib/ui/form-editor/form-editor.module').then(
						(m) => m.FormEditorModule
					)
			}
		])
	],
	exports: [],
	providers: []
})
export class AdminFormCreatorModule {}
