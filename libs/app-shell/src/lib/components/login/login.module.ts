import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzFormModule, NzInputModule } from 'ng-zorro-antd';

import { LoginComponent } from './login.component';

@NgModule({
    declarations: [LoginComponent],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, NzFormModule, NzInputModule],
    exports: [LoginComponent]
})
export class LoginModule {}
