import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzButtonModule, NzLayoutModule, NzMenuModule, NzDividerModule } from 'ng-zorro-antd';

import { AppLayoutComponent } from './app-layout.component';
import { HeaderItemComponent } from './header/header-item.component';

@NgModule({
    declarations: [AppLayoutComponent, HeaderItemComponent],
    imports: [CommonModule, RouterModule, NzLayoutModule, NzMenuModule, NzButtonModule, NzDividerModule],
    exports: [AppLayoutComponent]
})
export class AppLayoutModule {}
