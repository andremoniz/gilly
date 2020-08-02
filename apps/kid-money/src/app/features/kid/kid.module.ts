import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KidComponent } from './kid.component';

@NgModule({
	declarations: [KidComponent],
	imports: [CommonModule, RouterModule.forChild([{ path: '', component: KidComponent }])],
	exports: [],
	providers: []
})
export class KidModule {}
