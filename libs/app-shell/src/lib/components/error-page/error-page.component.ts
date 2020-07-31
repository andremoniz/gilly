import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'lib-error-page',
    templateUrl: './error-page.component.html',
    styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
    message = 'Something went wrong...';

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        if (this.route.snapshot.data) {
            this.message = this.route.snapshot.data['message'];
        }
    }
}
