import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MetricPageVisit } from '@entities';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { AppShellModuleConfig } from '../app-shell.module';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class MetricsService {
	private config: AppShellModuleConfig;

	currentRoute: string;

	constructor(
		@Inject('config') config: AppShellModuleConfig,
		private auth: AuthService,
		private http: HttpClient,
		private router: Router,
		private route: ActivatedRoute
	) {
		this.config = config;

		console.log('Metrics Loaded');
	}

	enableMetrics() {
		this.router.events
			.pipe(
				filter((event) => event instanceof NavigationEnd),
				map(() => this.route),
				map((route) => route.firstChild),
				switchMap((route) => (route.firstChild ? route.firstChild.data : route.data))
			)
			.subscribe((routeData) => {
				if (this.currentRoute === (routeData.breadcrumb || 'Home') || !this.auth.getUser())
					return; // don't log multiple duplicates; TODO: Revisit this later

				this.currentRoute = routeData.breadcrumb || 'Home';
				this.logPageVisit(this.currentRoute);
			});
	}

	getMetrics(metricName: string): Observable<any[]> {
		return this.http.get<any[]>(`${this.config.serverEndpoint}/metrics/${metricName}`);
	}

	logPageVisit(pageName: string) {
		if (this.config.userMetrics) {
			this.http
				.post(`${this.config.dataEndpoint}/${MetricPageVisit.displayName}`, {
					pageName: pageName,
					appName: this.config.appName
				})
				.subscribe((res) => {});
		}
	}
}
