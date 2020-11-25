import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserAuthorizedPipe } from './auth/user-authorized.pipe';
import { UserUnauthorizedPipe } from './auth/user-unauthorized.pipe';

@NgModule({
	declarations: [UserAuthorizedPipe, UserUnauthorizedPipe],
	imports: [CommonModule],
	exports: [UserAuthorizedPipe, UserUnauthorizedPipe]
})
export class AppShellPipesModule {}
