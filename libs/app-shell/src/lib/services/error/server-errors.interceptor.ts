// server-errors.interceptor.ts
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { retry } from "rxjs/operators";

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // If the call fails, retry until 5 times before throwing an error
        return next.handle(request).pipe(retry(5));
    }
}
