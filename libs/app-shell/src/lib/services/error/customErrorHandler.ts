import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";

import { ErrorsService } from "./error.service";
// import { AlertsService } from '../alerts.service';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) {}

    handleError(error: Error | HttpErrorResponse) {
        const errorsService = this.injector.get(ErrorsService);
        // const alertsService = this.injector.get(AlertsService);
        const router = this.injector.get(Router);

        if (error instanceof HttpErrorResponse) {
            if (!navigator.onLine) {
                // return notificationService.notify('No Internet Connection');
            } else {
                // return notificationService.notify(`${error.status} - ${error.message}`);
            }
        } else {
            // router.navigate(['/error'], { queryParams: { error: error } });
        }

        console.log(error.message);
        // alertsService.openAlert(JSON.stringify(error));
    }
}
