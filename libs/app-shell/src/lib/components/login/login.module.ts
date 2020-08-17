import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

import { LoginComponent } from './login.component';

@NgModule({
	declarations: [LoginComponent],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule],
	exports: [LoginComponent]
})
export class LoginModule {}
