import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppLayoutComponent } from './app-layout.component';
import { HeaderItemComponent } from './header/header-item.component';

@NgModule({
    declarations: [AppLayoutComponent, HeaderItemComponent],
    imports: [CommonModule, RouterModule],
    exports: [AppLayoutComponent]
})
export class AppLayoutModule {}
