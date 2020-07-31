import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'admin-overview',
	template: `
		<div class="container">
			<div class="d-flex justify-content-between">
				<nz-card
					class="w-50 ml-3 mr-3 mt-5"
					[nzHoverable]="true"
					[routerLink]="[tool.link]"
					matRipple
					*ngFor="let tool of adminTools"
				>
					<nz-card-meta
						[nzTitle]="tool.name"
						[nzDescription]="tool.description"
						[nzAvatar]="avatarTmpl"
					>
					</nz-card-meta>
					<ng-template #avatarTmpl>
						<i nz-icon [nzType]="tool.icon" nzTheme="outline"></i>
					</ng-template>
				</nz-card>
			</div>
		</div>
	`,
	styles: [``]
})
export class AdminOverviewComponent implements OnInit {
	adminTools = [
		{
			name: 'User Management',
			link: './user-management',
			description:
				'Maintain users in the system from their login info to their roles and permissions',
			icon: 'user'
		},
		{
			name: 'Metrics',
			link: './metrics',
			description:
				'View various metrics about the system, such as page views, button clicks, etc.',
			icon: 'eye'
		},
		{
			name: 'Form Editor',
			link: './form-editor',
			description: 'Manage forms in the system',
			icon: 'form'
		},
		{
			name: 'Data Tools',
			link: './data-tools',
			description: 'Tools for interacting with system data (Export, Import, etc.)',
			icon: 'file-sync'
		}
	];

	constructor() {}

	ngOnInit(): void {}
}
