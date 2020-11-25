import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { DataService, HttpMethods } from '../data.service';
import { GenericModelHttpParams } from './GenericModelHttpParams';

@Injectable()
export class DataServiceInterceptor implements HttpInterceptor {
	private hasError;

	constructor(private DS: DataService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		this.hasError = false;
		this.DS.loading$.next(true);

		const modelName: string =
			req.params instanceof GenericModelHttpParams ? req.params.model : null;

		if (modelName) {
			this.DS.loadingMap[this.DS.getModelName(modelName)].next(true);
		}

		return next.handle(req).pipe(
			finalize(() => {
				this.DS.loading$.next(false);

				if (modelName) {
					this.DS.loadingMap[this.DS.getModelName(modelName)].next(false);

					if (req.method !== 'GET' && !this.hasError) {
						this.DS.messageMap[this.DS.getModelName(modelName)].next(
							this.DS.generateCompletionMessage(
								modelName,
								<HttpMethods>req.method,
								'SUCCESS'
							)
						);
					}
				}
			}),
			catchError((error: HttpErrorResponse) => {
				this.hasError = true;

				if (modelName) {
					this.DS.messageMap[this.DS.getModelName(modelName)].next(
						this.DS.generateCompletionMessage(
							modelName,
							<HttpMethods>req.method,
							'ERROR',
							error.message
						)
					);
				}
				return throwError(error);
			})
		);
	}
}
