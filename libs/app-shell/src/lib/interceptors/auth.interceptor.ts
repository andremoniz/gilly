import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private auth: AuthService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		const user = this.auth.getUser();
		if (!user) return next.handle(req);

		// Get the auth token from the service.
		const authToken = user.jwt;

		// Clone the request and set the new header in one step.
		const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } });

		// send cloned request with header to the next handler.
		return next.handle(authReq).pipe(
			catchError((error, caught) => {
				this.handleAuthError(error);
				return of(error);
			})
		);
	}

	private handleAuthError(err: HttpErrorResponse): Observable<any> {
		if (err.status === 401) {
			this.auth.handleUnauthorized();
			return of(err.message);
		}
		throw err;
	}
}
