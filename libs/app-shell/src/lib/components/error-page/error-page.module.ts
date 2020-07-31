import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './error-page.component';

const routes = [
    {
        path: '',
        component: ErrorPageComponent
    }
];

@NgModule({
    declarations: [ErrorPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ErrorPageModule {}
