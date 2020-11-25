import { Component, OnInit, ViewChild } from '@angular/core';
import { LeafletMouseEvent } from 'leaflet';

import { UIMapDisplayOptions } from '../../../visualization/map/ui-map.interface';
import { UIFieldBase } from './../ui-field.base';

@Component({
	selector: 'ui-field-location',
	template: `
		<div class="p-inputgroup p-location-input" #locationInput>
			<input
				type="text"
				pInputText
				readonly
				placeholder="Click the button to select a location..."
			/>
			<button
				type="button"
				pButton
				pRipple
				icon="pi pi-map-marker"
				styleClass=""
				(click)="mapPickerTemplate.toggle($event)"
				title="Click here to open the map picker, selecting a location on the map will send it to this field."
				[disabled]="field.disabled"
			></button>
		</div>

		<ng-container *ngIf="control.value as modelLocation">
			<div class="d-flex w-100 justify-content-end">
				<small>Latitude: {{ modelLocation.latitude | number: '.1-4' }}</small>
				<small class="ml-1 mr-1">|</small>
				<small>Longitude: {{ modelLocation.longitude | number: '.1-4' }}</small>
			</div>
		</ng-container>

		<p-overlayPanel
			#mapPickerTemplate
			appendTo="body"
			[dismissable]="true"
			[showCloseIcon]="true"
			[showTransitionOptions]="'100ms'"
			[hideTransitionOptions]="'50ms'"
		>
			<ng-template pTemplate>
				<div style="height:300px !important; width:300px !important; margin: -12px -16px;">
					<ui-map
						[displayOptions]="mapDisplayOptions"
						[data]="currentValueMarker"
						(mapClicked)="handleMapClicked($event, mapPickerTemplate)"
					></ui-map>
				</div>
			</ng-template>
		</p-overlayPanel>
	`,
	styles: [``]
})
export class UIFieldLocationPrimeNGComponent extends UIFieldBase implements OnInit {
	@ViewChild('mapPickerTemplate', { static: false }) mapPickerPanel;

	mapDisplayOptions: UIMapDisplayOptions;
	currentValueMarker;

	constructor() {
		super();

		// this.mapDisplayOptions = {
		// 	mapOptions: {
		// 		...this.fcConfig.mapOptions,
		// 		disableZoomFit: true,
		// 		hideCustomControls: true,
		// 		zoomWheelPercent: 1.5
		// 	},
		// 	markerConfig: {
		// 		locationConfig: {
		// 			latitudeProp: 'latitude',
		// 			longitudeProp: 'longitude'
		// 		}
		// 	}
		// };
	}

	ngOnInit(): void {
		this.control.valueChanges.subscribe((value) => {});
	}

	handleMapClicked(event: LeafletMouseEvent) {
		const { lat, lng } = event.latlng;
		const locationObject: any = {
			latitude: lat,
			longitude: lng
		};
		this.mapPickerPanel.hide();
		this.control.setValue(locationObject);
	}
}
