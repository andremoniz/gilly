import 'leaflet-tooltip-layout';

import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	OnInit,
	Output
} from '@angular/core';
import { UIMapDisplayOptions } from '@sof/ui-components';
import { uuidv4 } from 'libs/utilities/src/lib/utilities/uuidv4';

import { UIVisualizationBase, UIVisualizationConfig } from '../ui-visualization.base';
import { UIMapService } from './ui-map.service';

@Component({
	selector: 'ui-map',
	template: `
		<ui-visualization (dimensionChange)="handleDimensionChange($event)">
			<ng-template #vis>
				<div
					[id]="uniqueMapId"
					*ngIf="viewDimensions"
					[style.height]="viewDimensions.height + 'px'"
				></div>

				<p-dialog
					[header]="uiMapService.tooltipHeader"
					[modal]="true"
					[style]="{ width: '50vw' }"
					[dismissableMask]="true"
					[baseZIndex]="10000"
					[(visible)]="uiMapService.tooltipVisible"
				>
					<div [innerHTML]="uiMapService.tooltipContent"></div>
				</p-dialog>
			</ng-template>
		</ui-visualization>
	`,
	styleUrls: [
		'./styles/ui-map-leaftlet.scss',
		'./styles/ui-map-markercluster.scss',
		'./styles/ui-map-beautifymarker.scss',
		'./styles/ui-map.scss'
	],
	providers: [UIMapService]
})
export class UIMapComponent extends UIVisualizationBase implements OnInit, AfterViewInit {
	uniqueMapId = `uiMapRef${uuidv4()}`;

	@Output() mapClicked = new EventEmitter<any>();

	@Output() mapZoomMove = new EventEmitter<{
		zoom: number;
		center: { lat: number; lng: number };
	}>();

	constructor(public cdRef: ChangeDetectorRef, public uiMapService: UIMapService) {
		super(cdRef);

		this.uiMapService.mapClicked = this.mapClicked;
		this.uiMapService.itemClicked = this.itemClicked;
		this.uiMapService.itemHovered = this.itemHovered;
		this.uiMapService.dataFiltered = this.dataFiltered;
		this.uiMapService.mapZoomMove = this.mapZoomMove;

		this.displayOptionsLoaded$.subscribe((displayOptions: UIMapDisplayOptions) => {
			this.uiMapService.setupDisplayOptions(displayOptions);
			this.emitConfigLoaded();
		});

		this.configLoaded$.subscribe((config: UIVisualizationConfig) => {
			this.uiMapService.createMarkersForEntities(this.config.data);
		});

		this.hoveredItemInternalSet$.subscribe((item) => {
			this.uiMapService.handleExternalMarkerHover(item);
		});
	}

	ngOnInit(): void {}

	ngAfterViewInit() {
		this.uiMapService.createMap(this.uniqueMapId);

		if (this.config && this.config.data)
			this.uiMapService.createMarkersForEntities(this.config.data);
	}
}
