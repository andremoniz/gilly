import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PageContainerComponent } from './page-container.component';

@NgModule({
    declarations: [PageContainerComponent],
    imports: [CommonModule],
    exports: [PageContainerComponent]
})
export class PageContainerModule {}
