import { checkUserRole } from './../../../../utilities/src/lib/auth/checkUserRole';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { AuthService } from './../services/auth.service';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private auth: AuthService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot) {
		if (!this.auth.isAuthenticated()) {
			this.router.navigate(['/login']);
			return false;
		}

		if (!checkUserRole(this.auth.getUser(), route.data.expectedRoles)) {
			this.router.navigate(['/notauthorized']);
			return false;
		}

		return true;
	}
}
