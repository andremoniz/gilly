import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FCFormService } from '@lib/form-creator';
import { NzFormatEmitEvent } from 'ng-zorro-antd';
import { NzTreeComponent } from 'ng-zorro-antd/tree';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { appMeta } from '../../../../../../../config/app.meta';
import { AuthAction, AuthRole, FCForm } from '../../../../../../../libs/data/src';
import { DataService } from './../../../../../../../libs/data/src/lib/services/data/data.service';
import {
	EditModalConfig,
	FormTakingService
} from './../../../../../../../libs/form-creator/src/lib/services/form-taking.service';

@Injectable()
export class RBACService {
	roles: AuthRole[] = [];
	roles$ = new BehaviorSubject<AuthRole[]>([]);

	selectedRole: AuthRole;

	roleEditConfig: EditModalConfig = {
		save: this.saveRole.bind(this),
		delete: this.deleteRole.bind(this),
		nameProp: 'role',
		immutable: true,
		fields: [
			{
				key: 'role',
				type: 'input',
				label: 'Role',
				required: true
			},

			{
				key: 'type',
				type: 'input',
				label: 'Role Type'
			}
		]
	};

	actionNodes = [];
	entityNodes = [];

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private fcFormService: FCFormService,
		private formTakingService: FormTakingService,
		private dataService: DataService
	) {
		this.route.queryParamMap.subscribe((queryParams) => {
			const roleId = queryParams.get('id');
			if (roleId) {
				this.selectedRole = this.roles.find((r) => r.id === roleId);

				this.generateActionTree();
				this.generateEntityTree();
			}
		});
	}

	getRoles(): Observable<AuthRole[]> {
		return this.dataService.read(AuthRole).pipe(
			tap((roles) => {
				this.roles = roles;
				this.roles$.next(roles);
			})
		);
	}

	handleRoleClick(role: AuthRole) {
		this.router.navigate([], {
			relativeTo: this.route,
			fragment: '1',
			queryParams: { id: role.id }
		});
	}

	editRole(role?: AuthRole, event?: any) {
		this.formTakingService.showEditModal(role, this.roleEditConfig);
	}

	saveRole(role: AuthRole) {
		this.dataService
			.save(AuthRole, role)
			.pipe(take(1))
			.subscribe((res: AuthRole) => {
				if (role.id) {
					const roleToUpdate = this.roles.find((r) => r.id === role.id);
					if (roleToUpdate) {
						Object.assign(roleToUpdate, res);
					} else {
						this.roles.push(res);
					}
				} else {
					this.roles.push(res);
				}
			});
	}

	deleteRole(role: AuthRole) {
		this.dataService
			.delete(AuthRole, role)
			.pipe(take(1))
			.subscribe((res) => {
				this.roles = this.roles.filter((r) => r.id !== role.id);
			});
	}

	generateActionTree() {
		this.actionNodes = [];
		Object.keys(appMeta).forEach((app, i) => {
			const meta = appMeta[app];
			this.actionNodes.push({
				title: meta.name,
				key: meta.name,
				expanded: false,
				isLeaf: !meta.actions || meta.actions.length === 0,
				children: meta.actions.map((action, j) => {
					return this.generateActionNode(action, app);
				})
			});
		});
	}

	generateActionNode(action: AuthAction, parent?: string) {
		return {
			title: action.action,
			key: `${action.action}_${parent ? parent : ''}`,
			expanded: false,
			isLeaf: !action.children || action.children.length === 0,
			children: (action.children || []).map((childAction, j) => {
				return this.generateActionNode(childAction, action.action);
			})
		};
	}

	generateEntityTree() {
		this.fcFormService.getForms().subscribe((forms: FCForm[]) => {
			this.entityNodes = [];
			const categories = {};
			forms.forEach((f) => (categories[f.formCategory] = true));

			Object.keys(categories)
				.sort()
				.forEach((category) => {
					this.entityNodes.push({
						title: category,
						key: category,
						isExpanded: false,
						isLeaf: false,
						children: forms
							.filter((f) => f.formCategory === category)
							.sort((a, b) =>
								a.formName === b.formName ? 0 : a.formName > b.formName ? 1 : -1
							)
							.map((f: FCForm) => {
								return {
									...f,
									title: f.formName || f.tableName,
									key: f.id,
									isExpanded: false,
									isLeaf: false,
									children: [
										this.generateActionNode({ action: 'CREATE' }, f.id),
										this.generateActionNode({ action: 'READ' }, f.id),
										this.generateActionNode({ action: 'UPDATE' }, f.id),
										this.generateActionNode({ action: 'DELETE' }, f.id)
									]
								};
							})
					});
				});
		});
	}

	handleActionChecked(event: NodeCheckedEvent) {
		console.log(event);
		console.log(event.component.getCheckedNodeList());
	}

	handleEntityChecked(event: NodeCheckedEvent) {
		console.log(event);
		console.log(event.component.getCheckedNodeList());
	}
}

export interface NodeCheckedEvent {
	event: NzFormatEmitEvent;
	component: NzTreeComponent;
}
