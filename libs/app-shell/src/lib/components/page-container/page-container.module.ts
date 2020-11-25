import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PageContainerComponent } from './page-container.component';
import { PageHeaderComponent } from './page-header.component';

@NgModule({
	declarations: [PageContainerComponent, PageHeaderComponent],
	imports: [CommonModule],
	exports: [PageContainerComponent, PageHeaderComponent]
})
export class PageContainerModule {}
