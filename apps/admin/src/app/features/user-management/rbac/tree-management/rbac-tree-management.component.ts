import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NzTreeComponent } from 'ng-zorro-antd';

import { NodeCheckedEvent, RBACService } from '../rbac.service';

@Component({
	selector: 'rbac-tree-management',
	template: `
		<h3 class="w-100 border-bottom">{{ title }}</h3>
		<nz-input-group [nzSuffix]="suffixIcon" class="mb-3">
			<input type="text" nz-input placeholder="Search" [(ngModel)]="searchValue" />
		</nz-input-group>
		<ng-template #suffixIcon>
			<i nz-icon nzType="search"></i>
		</ng-template>
		<nz-tree
			#rbacTree
			[nzData]="nodes"
			[nzSearchValue]="searchValue"
			[nzCheckable]="true"
			[nzShowLine]="true"
			[nzBlockNode]="true"
			(nzCheckBoxChange)="nodeChecked.emit({ event: $event, component: rbacTreeComponent })"
		>
		</nz-tree>
	`,
	styles: [``]
})
export class RBACTreeManagementComponent implements OnInit {
	@ViewChild('rbacTree', { static: false }) rbacTreeComponent!: NzTreeComponent;

	@Input() title: string;
	@Input() nodes: any[];

	@Output() nodeChecked = new EventEmitter<NodeCheckedEvent>();

	searchValue: string = '';

	constructor(public rbacService: RBACService) {}

	ngOnInit(): void {}
}
