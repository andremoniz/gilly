import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LeafletMouseEvent } from 'leaflet';
import * as mgrsConvert from 'mgrs';

import { EntityLocation } from '../../../../../../entities/__composites/entity-location';
import { UIMapDisplayOptions } from '../../../visualization/map/ui-map.interface';
import { FormCreatorConfig } from './../../../../../../form-creator/src/lib/form-creator.module';
import { UIFieldBase } from './../ui-field.base';

@Component({
	selector: 'ui-field-location',
	template: `
		<div class="p-inputgroup p-location-input" #locationInput>
			<input type="text" pInputText [formControl]="mgrsControl" />
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

	fcConfig: FormCreatorConfig;

	mgrsControl;

	mapDisplayOptions: UIMapDisplayOptions;
	currentValueMarker;

	constructor(@Inject('FormCreatorConfig') config: FormCreatorConfig) {
		super();
		this.fcConfig = config;

		this.mapDisplayOptions = {
			mapOptions: {
				...this.fcConfig.mapOptions,
				disableZoomFit: true,
				hideCustomControls: true,
				zoomWheelPercent: 1.5
			},
			markerConfig: {
				locationConfig: {
					latitudeProp: 'latitude',
					longitudeProp: 'longitude'
				}
			}
		};
	}

	ngOnInit(): void {
		this.mgrsControl = new FormControl({ value: null, disabled: this.field.disabled });

		if (this.control.value && this.control.value.mgrs) {
			this.mgrsControl.setValue(this.control.value.mgrs);

			this.currentValueMarker = [
				{ latitude: this.control.value.latitude, longitude: this.control.value.longitude }
			];
		}

		this.mgrsControl.valueChanges.subscribe((value) => {
			this.control.setValue(value);
		});

		this.control.valueChanges.subscribe((value) => {
			this.createLocationObject(value);
		});
	}

	createLocationObject(value: any): EntityLocation {
		let mgrs = value;

		if (typeof value === 'object') {
			mgrs = value.mgrs;
		}

		// Update model, spread into composite location object based on key...
		const { lat, lng } = this.convertMGRSToLatLon(mgrs);
		const locationObject: EntityLocation = {
			latitude: lat,
			longitude: lng,
			mgrs: mgrs
		};

		this.control.setValue(locationObject, {
			emitEvent: false
		});

		return locationObject;
	}

	handleMapClicked(event: LeafletMouseEvent) {
		const { lat, lng } = event.latlng;
		const mgrs = this.convertLatLngToMGRS(lat, lng);

		this.mapPickerPanel.hide();

		this.mgrsControl.setValue(mgrs);
	}

	convertMGRSToLatLon(mgrs: string) {
		let lat, lng;
		try {
			[lng, lat] = mgrsConvert.toPoint(mgrs);
		} catch {
			lat = null;
			lng = null;
		}
		return { lat, lng };
	}

	convertLatLngToMGRS(lat: number, lng: number) {
		let mgrs;
		try {
			mgrs = mgrsConvert.forward([lng, lat]);
		} catch {
			mgrs = '';
		}
		return mgrs;
	}
}
