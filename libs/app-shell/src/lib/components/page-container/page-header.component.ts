import { DOCUMENT } from '@angular/common';
import {
	Component,
	ComponentFactoryResolver,
	ContentChild,
	Inject,
	Injector,
	Input,
	OnInit,
	TemplateRef,
	Type,
	ViewEncapsulation
} from '@angular/core';

export type Content<T> = string | TemplateRef<T> | Type<T>;

@Component({
	selector: 'page-header',
	template: `
		<header
			class="d-flex justify-content-between w-100 p-3"
			[ngClass]="hideBottomBorder ? '' : 'border-bottom'"
		>
			<div #leftItems class="d-flex align-items-center">
				<h2>
					<span *ngIf="pageTitle">{{ pageTitle }}</span>
				</h2>

				<h5 class="ml-3">
					<span class="ui-page-header-sub-title" *ngIf="pageSubTitle">{{
						pageSubTitle
					}}</span>
				</h5>
			</div>

			<div #rightItems>
				<ng-container
					[ngTemplateOutlet]="headerItemsTemplate"
					*ngIf="headerItemsTemplate"
				></ng-container>
			</div>
		</header>
	`,
	styles: [
		`
			ui-page-header {
				width: 100% !important;
			}

			.ui-page-header-sub-title {
				color: #cdcdcd;
			}
		`
	],
	encapsulation: ViewEncapsulation.None
})
export class PageHeaderComponent implements OnInit {
	@ContentChild('headerItems') headerItemsTemplate: TemplateRef<any>;

	@Input() pageTitle: string;
	@Input() pageSubTitle: string;
	@Input() hideBottomBorder: boolean;

	constructor(
		private resolver: ComponentFactoryResolver,
		private injector: Injector,
		@Inject(DOCUMENT) private document: Document
	) {}

	ngOnInit(): void {}

	resolveNgContent<T>(content: Content<T>) {
		if (typeof content === 'string') {
			const element = this.document.createTextNode(content);
			return [[element]];
		}

		if (content instanceof TemplateRef) {
			const viewRef = content.createEmbeddedView(null);
			return [viewRef.rootNodes];
		}

		const factory = this.resolver.resolveComponentFactory(content);
		const componentRef = factory.create(this.injector);
		return [[componentRef.location.nativeElement]];
	}
}
