import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	ContentChild,
	ElementRef,
	EventEmitter,
	OnInit,
	Output,
	TemplateRef,
	ViewChild
} from '@angular/core';
import { UIDimension } from './ui-visualization.base';

@Component({
	selector: 'ui-visualization',
	template: `
		<div class="h-100 w-100" #visContainer (window:resize)="handleResize($event)">
			<ng-container [ngTemplateOutlet]="visTemplate" *ngIf="visTemplate"></ng-container>
		</div>
	`,
	styles: [``]
})
export class UIVisualizationComponent implements OnInit, AfterViewInit {
	@ViewChild('visContainer', { static: true }) visContainerRef: ElementRef;

	@ContentChild('vis') visTemplate: TemplateRef<any>;

	@Output() dimensionChange = new EventEmitter<UIDimension>();

	containerHeight: number;
	containerWidth: number;

	constructor(private cdRef: ChangeDetectorRef) {}

	ngOnInit() {}

	ngAfterViewInit() {
		this.checkContainerDimensions();
	}

	handleResize(event) {
		this.checkContainerDimensions();
	}

	checkContainerDimensions() {
		const container = this.visContainerRef.nativeElement;

		this.containerHeight = container && container.clientHeight ? container.clientHeight : 400;
		this.containerWidth = container && container.clientWidth ? container.clientWidth : 400;

		this.dimensionChange.emit({
			height: this.containerHeight > 0 ? this.containerHeight : 0,
			width: this.containerWidth > 0 ? this.containerWidth : 0
		});

		this.cdRef.detectChanges();
	}
}

export enum UIVisualizationType {
	BAR = 'bar-chart',
	BUBBLE = 'bubble-chart',
	GAUGE = 'gauge-chart',
	LINE = 'line-chart',
	PIE = 'pie-chart',
	POLAR = 'polar-chart',
	TREEMAP = 'tree-map',

	MAP = 'map',

	TABLE = 'table',

	TIMELINE = 'timeline'
}
