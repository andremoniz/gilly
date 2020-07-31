import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class AlertsService {
    constructor(private message: NzMessageService) {}

    openAlert(msg: string, duration?: number) {
        this.message.success(msg, {
            nzDuration: duration || 1500
        });
    }
}
