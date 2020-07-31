import { Component, OnInit } from '@angular/core';
import { MetricPageView, MetricPageVisit } from '@entities';

import { MetricsService } from '../../../../../../libs/app-shell/src/lib/services/metrics.service';
import { DataService } from '../../../../../../libs/data/src/lib/services/data/data.service';
import { UITableDisplayOptions } from '../../../../../../libs/ui-components/src/lib/visualization/table/ui-table.interface';
import { FCForm } from './../../../../../../libs/data/src/lib/entities/form-creator/fc-form';
import { FCFormService } from './../../../../../../libs/form-creator/src/lib/state/fc-form.service';
import { forkJoin } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NzTabComponent } from 'ng-zorro-antd';

@Component({
	selector: 'metrics',
	template: `
		<div class="container container-wrapper">
			<div class="container-main">
				<nz-tabset
					(nzSelectChange)="handleTabChange($event)"
					[nzSelectedIndex]="selectedTabIndex"
				>
					<nz-tab nzTitle="App Overview" class="h-100">
						<h2 class="border-bottom w-100">Views by App</h2>
						<ui-number-chart
							[data]="appOverviewMetrics"
							[displayOptions]="{
								groupProp: 'appName',
								xAxisLabel: 'App Name',
								showLabels: 'true',
								aggregation: 'VALUE_SUM',
								valueProp: 'viewCount'
							}"
						></ui-number-chart>
					</nz-tab>

					<nz-tab nzTitle="Page Views">
						<ui-table [data]="pageViewMetrics" [displayOptions]="pageViewOptions">
						</ui-table>
					</nz-tab>

					<nz-tab nzTitle="Page Visits">
						<ui-table [data]="pageVisitMetrics" [displayOptions]="pageVisitOptions">
						</ui-table>
					</nz-tab>

					<nz-tab nzTitle="Reporting">
						<h2 class="border-bottom w-100">Report Counts</h2>
						<button nz-button class="bg-priamry text-white" (click)="queryReports()">
							Query Reports
						</button>
						<ui-number-chart
							*ngIf="reportCounts && reportCounts.length"
							[data]="reportCounts"
							[displayOptions]="{
								groupProp: 'reportName',
								xAxisLabel: 'Report Name',
								showLabels: 'true',
								aggregation: 'VALUE_SUM',
								valueProp: 'reportCount'
							}"
						></ui-number-chart>
					</nz-tab>
				</nz-tabset>
			</div>
		</div>
	`,
	styles: [``]
})
export class MetricsComponent implements OnInit {
	appOverviewMetrics = [];
	reportCounts = [];

	pageViewMetrics: MetricPageView[] = [];
	pageViewOptions: UITableDisplayOptions = {
		defaultPageSize: 25,
		columns: [
			{ prop: 'appName' },
			{ prop: 'pageName' },
			{ prop: 'viewCount' },
			{ prop: 'modifyDate', type: 'date', dateStyle: 'short' }
		]
	};

	pageVisitMetrics: MetricPageVisit[] = [];
	pageVisitOptions: UITableDisplayOptions = {
		defaultPageSize: 25,
		columns: [
			{ prop: 'createUser' },
			{ prop: 'appName' },
			{ prop: 'pageName' },
			{ prop: 'createDate', type: 'date', dateStyle: 'short' }
		]
	};

	selectedTabIndex = 0;

	constructor(
		public metricsService: MetricsService,
		private fcFormService: FCFormService,
		private dataService: DataService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.route.fragment.subscribe((frag) => {
			this.selectedTabIndex = +frag;
		});

		this.metricsService.getMetrics('MetricPageView').subscribe((res) => {
			this.pageViewMetrics = res;

			this.setupAppOverviewMetrics();
		});

		this.metricsService.getMetrics('MetricPageVisit').subscribe((res) => {
			this.pageVisitMetrics = res;
		});
	}

	handleTabChange(event: { index: number; tab: NzTabComponent }) {
		this.selectedTabIndex = event.index;
		this.router.navigate([], { relativeTo: this.route, fragment: `${event.index}` });
	}

	setupAppOverviewMetrics() {
		this.appOverviewMetrics = [];
		const appViewMap = {};
		this.pageViewMetrics.forEach((pvm: MetricPageView) => {
			if (appViewMap[pvm.appName]) {
				appViewMap[pvm.appName] += pvm.viewCount || 0;
			} else {
				appViewMap[pvm.appName] = pvm.viewCount || 0;
			}
		});

		Object.keys(appViewMap).forEach((app) => {
			this.appOverviewMetrics.push({ appName: app, viewCount: appViewMap[app] });
		});
	}

	queryReports() {
		const obs = {};

		this.fcFormService.getForms().subscribe((forms: FCForm[]) => {
			forms.forEach((form: FCForm) => {
				obs[form.formName || form.tableName] = this.dataService.read(form.tableName);
			});
			forkJoin(obs).subscribe((res: any[]) => {
				Object.keys(res).forEach((reportName) => {
					this.reportCounts.push({
						reportName: reportName,
						reportCount: res[reportName].length
					});
				});
			});
		});
	}
}
