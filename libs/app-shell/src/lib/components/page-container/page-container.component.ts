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
	Type
} from '@angular/core';

export type Content<T> = string | TemplateRef<T> | Type<T>;

@Component({
	selector: 'lib-page-container',
	templateUrl: './page-container.component.html',
	styleUrls: ['./page-container.component.scss']
})
export class PageContainerComponent implements OnInit {
	@ContentChild('header') headerTemplate: TemplateRef<any>;
	@ContentChild('main') mainTemplate: TemplateRef<any>;
	@ContentChild('footer') footerTemplate: TemplateRef<any>;

	@Input() fluidMain: boolean = true;

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
