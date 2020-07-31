import { ChangeDetectorRef, Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { circle, latLng, Map, tileLayer, tooltip } from 'leaflet';

import { UIVisualizationBase, UIVisualizationConfig } from '../ui-visualization.base';
import { UIMapOptions } from './ui-map.interface';

@Component({
	selector: 'ui-map',
	template: `
		<ui-visualization (dimensionChange)="handleDimensionChange($event)">
			<ng-template #vis>
				<div
					*ngIf="viewDimensions"
					[style.height]="viewDimensions.height + 'px'"
					leaflet
					[leafletOptions]="mapOptions"
					[leafletLayers]="layers"
					(leafletMapReady)="onMapReady($event)"
					(leafletClick)="mapClicked.emit($event)"
				></div>
			</ng-template>
		</ui-visualization>
	`,
	styles: [
		`
			/* @import ('../../../../../node_modules/leaflet/dist/leaflet.css'); */
		`
	]
})
export class UIMapComponent extends UIVisualizationBase implements OnInit {
	mapOptions: any;
	mapRef: Map;
	layers = [];

	@Output() mapClicked = new EventEmitter<any>();

	constructor(public cdRef: ChangeDetectorRef, private ngZone: NgZone) {
		super(cdRef);

		this.displayOptionsLoaded$.subscribe((displayOptions: any) => {
			this.mapOptions = this.setupMapOptions(displayOptions.mapOptions);
		});

		this.configLoaded$.subscribe((config: UIVisualizationConfig) => {
			this.createCirclesForEntities(config.data);
		});
	}

	ngOnInit(): void {}

	onMapReady(map: Map) {
		this.mapRef = map;
	}

	setupMapOptions(mapOptions: UIMapOptions) {
		if (!mapOptions) return null;

		const generateLayers = (mapOptionLayers: any[]) => {
			return mapOptionLayers.map((l) => {
				switch (l.type) {
					case 'tile':
						return tileLayer(l.url, {
							maxZoom: l.maxZoom || 18,
							attribution: l.atribute || ''
						});
						break;
					default:
						break;
				}
			});
		};

		return {
			layers: generateLayers(mapOptions.layers),
			zoom: mapOptions.zoom,
			center: latLng(mapOptions.center[0], mapOptions.center[1])
		};
	}

	createCirclesForEntities(entities: any[]) {
		if (!this.displayOptions || !entities) return;

		this.layers = [];
		entities.forEach((entity) => {
			const entityLatitude = +entity[this.displayOptions.locationProp].latitude,
				entityLongitude = +entity[this.displayOptions.locationProp].longitude;
			if (!entityLatitude || !entityLongitude) return;

			const circleMarker: any = circle([entityLatitude, entityLongitude], {
				radius: 5000,
				color: '#2CE50',
				weight: 5
			})
				.on('click', this.circleClick.bind(this))
				.bindTooltip(
					tooltip({
						permanent: true,
						direction: 'top',
						className: 'text'
					}).setContent(entity[this.displayOptions.labelProp || 'id'])
				);
			circleMarker.data = entity;

			this.layers.push(circleMarker);
		});
	}

	circleClick(e) {
		this.itemClicked.emit(e.target.data);
		this.ngZone.run(() => {});
	}
}
