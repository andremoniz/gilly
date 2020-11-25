import { prettyPrint } from './../../../../../utilities/src/lib/utilities/strings/prettyPrint';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import 'leaflet';
import 'beautifymarker';
import 'leaflet.markercluster';
import './plugins/leaflet-control-overlays';
import './plugins/leaflet-country-select';
import './plugins/leaflet-fit-data';
import './plugins/leaflet-toggle-tooltips';
import { LeafletTooltipLayout } from './plugins/leaflet-tooltip-layout';

import { EventEmitter, Injectable, NgZone } from '@angular/core';
import {
	icon,
	latLngBounds,
	LatLngExpression,
	Map,
	Marker,
	tooltip,
	MapOptions,
	LayersControlEvent,
	latLng,
	geoJSON
} from 'leaflet';

import { setupMapOptions, setupMarkerConfig } from './ui-map-setup';
import { UIMapDisplayOptions, UIMapMarkerConfig } from './ui-map.interface';
import { pickTextcolorBasedOnBackgroundColor } from '../../../../../utilities/src/lib/utilities/colors/pickTextColorBasedOnBackgroundColor';
import { ActivatedRoute, Router } from '@angular/router';

declare let L;

@Injectable()
export class UIMapService {
	mapRef: Map;
	markerLayerGroup: L.LayerGroup;
	markerLayerClusterGroup: L.LayerGroup | any;
	markersInBounds = [];

	selectedBaselayer: string;
	selectedOverlays: string[] = ['Markers'];
	overlayLayers: any;

	layerControls: L.Control;

	private tooltipLayout: LeafletTooltipLayout;

	displayOptions: UIMapDisplayOptions;
	mapOptions: MapOptions & any;
	markerConfig: UIMapMarkerConfig;

	mapClicked: EventEmitter<any>;

	itemClicked: EventEmitter<any>;
	itemHovered: EventEmitter<any>;

	toggleTooltipsFromZoom$ = new Subject<number>();
	generateMarkersInBounds$ = new Subject<boolean>();
	dataFiltered: EventEmitter<any[]>;
	mapZoomMove: EventEmitter<{
		zoom: number;
		center: { lat: number; lng: number };
	}>;
	mapMoveFilter = false;

	tooltipHeader: string;
	tooltipContent: any;
	tooltipVisible: boolean;

	private isBoundsZoom = true;
	private zoomLevels: { start: number; end: number } = { start: 0, end: 0 };
	private mapCenter: { lat: number; lng: number } = { lat: 0, lng: 0 };

	private clusterZoomThreshold = 10;

	private tooltipZoomThreshold = 6;
	private tooltipTotalThreshold = 30;
	private forceHideTooltips = false;
	private showTooltips = false;

	private previousCountry: any;

	private internalHoveredMarker: Marker;

	constructor(private ngZone: NgZone, private route: ActivatedRoute, private router: Router) {
		this.generateMarkersInBounds$.pipe(debounceTime(333)).subscribe((isZoom: boolean) => {
			this.generateMarkersInBounds(isZoom);
		});

		this.toggleTooltipsFromZoom$.pipe(debounceTime(333)).subscribe((end: number) => {
			this.toggleTooltipsFromZoom(end);
		});
	}

	onMapReady(map: Map) {
		this.mapRef = map;
	}

	createMap(mapContainerId = 'uiMapRef') {
		this.handleUrlParameters();

		this.mapRef = L.map(mapContainerId, this.mapOptions);

		this.setupMarkerLayerGroups();
		this.setupLayerControls();
		this.addCustomControls();
		this.attachEventsToMap();
	}

	private setupMarkerLayerGroups() {
		this.markerLayerGroup = L.layerGroup();
		this.markerLayerClusterGroup = L.markerClusterGroup({
			disableClusteringAtZoom: this.clusterZoomThreshold,
			showCoverageOnHover: true,
			zoomToBoundsOnClick: true,
			spiderfyOnMaxzoom: true,
			removeOutsideVisibleBounds: true
		});

		this.tooltipLayout = new LeafletTooltipLayout({ useInternalEvents: false });
		this.tooltipLayout.initialize(this.mapRef);
	}

	private setupLayerControls() {
		if (this.mapOptions.hideControls) return;

		this.overlayLayers = {
			Markers: this.markerLayerGroup,
			Clusters: this.markerLayerClusterGroup
		};

		this.addCustomOverlaysToControls();

		this.layerControls = L.control
			.layers(this.mapOptions.baseLayers, this.overlayLayers)
			.addTo(this.mapRef);

		this.selectedOverlays.forEach((oName) => {
			this.overlayLayers[oName].addTo(this.mapRef);
		});
	}

	private addCustomOverlaysToControls() {
		if (this.displayOptions.mapOptions.overlays && !this.mapOptions.hideCustomControls) {
			const customOverlays = this.displayOptions.mapOptions.overlays;
			Object.keys(customOverlays).forEach((overlayName) => {
				const overlayObject = customOverlays[overlayName];
				if (overlayObject.type === 'geojson') {
					this.overlayLayers[prettyPrint(overlayName)] = L.geoJson(
						overlayObject.collection,
						{
							style: this.generateGeoJsonStyle.bind(this),
							onEachFeature: this.onEachGeoJsonFeature.bind(this)
						}
					);
				}
			});
		}
	}

	private attachEventsToMap() {
		this.mapRef.on('click', (event) => this.mapClicked.emit(event));
		this.mapRef.on('zoomstart', this.zoomStart.bind(this));
		this.mapRef.on('zoomend', this.zoomEnd.bind(this));
		this.mapRef.on('moveend', this.moveEnd.bind(this));

		this.mapRef.on('baselayerchange', (e: LayersControlEvent) => {
			this.setUrlParameters();
		});
		this.mapRef.on('overlayadd', (e: LayersControlEvent) => {
			this.selectedOverlays.push(e.name);
			this.setUrlParameters();
		});
		this.mapRef.on('overlayremove', (e: LayersControlEvent) => {
			this.selectedOverlays = this.selectedOverlays.filter((oName) => oName !== e.name);
			this.setUrlParameters();
		});

		this.markerLayerClusterGroup.on('clustermouseover', function (event) {
			// event.layer.highlight();
			console.log('cluster mouseover', event);
		});
		this.markerLayerClusterGroup.on('clusterclick', () => {
			console.log('clusterclick!');
		});
	}

	private addCustomControls() {
		if (this.mapOptions.hideCustomControls) return;

		// this.setupCountrySelect();
		this.setupFitData();
		this.setupToggleTooltips();
	}

	private setupCountrySelect() {
		const select = L.countrySelect({ title: 'Select a country...' }).addTo(this.mapRef);

		select.on('change', (e) => {
			if (this.previousCountry != null) {
				this.mapRef.removeLayer(this.previousCountry);
				this.previousCountry = null;
			}

			if (e.feature === undefined) {
				return;
			}

			const country = L.geoJson(e.feature);
			this.previousCountry = country;
			this.mapRef.addLayer(country);
			this.mapRef.fitBounds(country.getBounds());
		});
	}

	private setupFitData() {
		const fitDataBtn = L.fitData({ position: 'topright' }).addTo(this.mapRef);
		fitDataBtn.on('click', (e) => {
			this.zoomToData();
		});
	}

	private setupToggleTooltips() {
		const toggleTooltipsBtn = L.toggleTooltips({ position: 'topright' }).addTo(this.mapRef);
		toggleTooltipsBtn.on('click', (e) => {
			if (this.showTooltips) {
				this.showTooltips = false;
				this.tooltipLayout.removeAllMarkers();
				this.setUrlParameters();
			} else {
				this.showTooltips = true;
				this.tooltipLayout.setMarkers(this.markersInBounds);
				this.setUrlParameters();
			}
		});
	}

	setupDisplayOptions(displayOptions: UIMapDisplayOptions) {
		this.displayOptions = displayOptions;

		this.mapOptions = setupMapOptions(displayOptions.mapOptions);

		this.markerConfig = setupMarkerConfig(displayOptions.markerConfig);

		this.tooltipZoomThreshold =
			this.markerConfig.tooltipZoomThreshold || this.tooltipZoomThreshold;
		this.tooltipTotalThreshold =
			this.markerConfig.tooltipTotalThreshold || this.tooltipTotalThreshold;
	}

	zoomStart(event) {
		this.zoomLevels.start = this.mapRef.getZoom();
	}

	zoomEnd(event) {
		this.zoomLevels.end = this.mapRef.getZoom();
		this.generateMarkersInBounds$.next(true);
		this.toggleTooltipsFromZoom$.next(this.zoomLevels.end);

		this.emitZoomMoveParameters();
	}

	moveEnd(event) {
		if (!this.isBoundsZoom) {
			this.generateMarkersInBounds$.next(false);
			this.toggleTooltipsFromZoom$.next(this.zoomLevels.end);
		}
		this.isBoundsZoom = false;

		this.mapCenter = event.target.getCenter();
		this.emitZoomMoveParameters();
	}

	private emitZoomMoveParameters() {
		this.mapZoomMove.emit({ zoom: this.zoomLevels.end, center: this.mapCenter });
		this.setUrlParameters();
	}

	private toggleTooltipsFromZoom(zoomEnd = this.zoomLevels?.end || 0) {
		this.tooltipLayout.removeAllMarkers();
		if (this.canShowTooltips(zoomEnd)) {
			this.tooltipLayout.setMarkers(this.markersInBounds);
		}
	}

	private canShowTooltips(zoomEnd = this.zoomLevels?.end || 0) {
		return (
			this.showTooltips ||
			(!this.forceHideTooltips &&
				(zoomEnd >= this.tooltipZoomThreshold ||
					(this.markersInBounds.length <= this.tooltipTotalThreshold &&
						zoomEnd >= this.tooltipZoomThreshold)))
		);
	}

	private generateMarkersInBounds(isZoom) {
		this.isBoundsZoom = isZoom;
		this.mapMoveFilter = true;

		// Find viewable markers
		this.markersInBounds = this.markerLayerGroup
			.getLayers()
			.filter((m: Marker) => this.mapRef.getBounds().contains(m.getLatLng()));

		// Emit filtered data
		this.dataFiltered.emit(this.markersInBounds.map((m: any) => m.data));
	}

	private zoomToData() {
		const bounds = latLngBounds(
			this.markerLayerGroup.getLayers().map((l: Marker) => l.getLatLng())
		);
		this.mapRef.fitBounds(bounds);
	}

	createMarkersForEntities(entities: any[]) {
		if (
			!this.displayOptions ||
			(!this.markerConfig.locationProp &&
				!this.markerConfig.locationConfig &&
				!this.markerConfig.locationConfig.latitudeProp &&
				!this.markerConfig.locationConfig.longitudeProp) ||
			!entities ||
			!this.mapRef
		) {
			return;
		}

		if (this.mapMoveFilter) {
			this.mapMoveFilter = false;
			return;
		}

		this.markerLayerGroup.clearLayers();
		this.markerLayerClusterGroup.clearLayers();
		entities.forEach((entity) => {
			const entityLatLng = this.getLatLngForEntity(entity);
			if (!entityLatLng) return;

			let marker;
			let markerOptions = { ...this.markerConfig.defaultMarkerOptions };

			marker = this.createMarkerForEntity(entity, markerOptions, entityLatLng);

			if (this.markerConfig.dataDrivenMarkers && this.markerConfig.dataDrivenMarkers.length) {
				const markerValueProp = this.markerConfig.markerValueProp;
				let dataDrivenOptions;
				if (markerValueProp) {
					const entityValue = entity[markerValueProp];
					dataDrivenOptions = this.markerConfig.markerMap[entityValue];
					Object.assign(markerOptions, dataDrivenOptions);
				} else {
					this.markerConfig.dataDrivenMarkers.forEach((ddm) => {
						const ddmValueProp = ddm.valueProp;
						const entityValue = entity[ddmValueProp];
						if (entityValue === ddm.value) {
							Object.assign(markerOptions, ddm);
							marker = this.createMarkerForEntity(
								entity,
								markerOptions,
								entityLatLng
							);
						}
					});
				}
			}

			this.markerLayerGroup.addLayer(marker);
		});

		this.markerLayerClusterGroup.addLayers(this.markerLayerGroup.getLayers());

		if (
			this.markerLayerGroup.getLayers().length &&
			!this.displayOptions.mapOptions.disableZoomFit
		) {
			this.zoomToData();
		}

		this.generateMarkersInBounds$.next(false);
		this.toggleTooltipsFromZoom$.next();
	}

	private handleUrlParameters() {
		if (this.displayOptions.mapOptions.setUrlParameters) {
			const mapStateParams = this.route.snapshot.queryParamMap.get('mapState');
			if (mapStateParams) {
				const mapState = JSON.parse(mapStateParams);

				// MAP REF
				this.mapCenter = {
					lat: +mapState.lat,
					lng: +mapState.lng
				};
				this.zoomLevels = {
					start: 0,
					end: +mapState.zoom
				};

				this.mapOptions.center = latLng(this.mapCenter.lat, this.mapCenter.lng);
				this.mapOptions.zoom = this.zoomLevels.end;

				// CONTROLS
				this.showTooltips = mapState.showTooltips;

				this.selectedBaselayer = mapState.selectedBaselayer;
				this.selectedOverlays = mapState.selectedOverlays || this.selectedOverlays;
			}
		} else {
			this.mapCenter = this.displayOptions.mapOptions.center || [0, 0];
			this.zoomLevels = {
				start: this.displayOptions.mapOptions.zoom || 1,
				end: this.displayOptions.mapOptions.zoom || 0
			};
		}
	}

	private setUrlParameters() {
		if (this.displayOptions.mapOptions.setUrlParameters) {
			this.router.navigate([], {
				queryParams: {
					mapState: JSON.stringify({
						zoom: this.zoomLevels.end,
						lat: this.mapCenter.lat,
						lng: this.mapCenter.lng,
						showTooltips: this.showTooltips,
						selectedBaselayer: this.selectedBaselayer,
						selectedOverlays: this.selectedOverlays
					})
				},
				queryParamsHandling: 'merge'
			});
		}
	}

	createMarkerForEntity(entity: any, markerOptions: any, entityLatLng: LatLngExpression): any {
		let marker: Marker;

		if (markerOptions.iconUrl) {
			marker = L.marker(entityLatLng, {
				icon: icon(markerOptions)
			});
		} else {
			marker = L.marker(entityLatLng, {
				icon: L.BeautifyIcon.icon({
					icon: markerOptions.fontAwesomeIcon,
					iconShape: markerOptions.shape || 'circle',
					borderColor: markerOptions.color,
					borderWidth: 3,
					textColor: 'transparent',
					backgroundColor: `rgba(180,180,180, 0.5)`,
					iconSize: [16, 16],
					innerIconStyle: 'font-size:1.25rem;'
				})
			});
		}

		this.applyEventsToMarker(marker, entity, markerOptions);
		return marker;
	}

	private getLatLngForEntity(entity: any): LatLngExpression {
		let entityLatitude, entityLongitude;

		// Check location field
		if (
			this.markerConfig.locationProp &&
			entity[this.markerConfig.locationProp] &&
			entity[this.markerConfig.locationProp].latitude &&
			entity[this.markerConfig.locationProp].longitude
		) {
			entityLatitude = +entity[this.markerConfig.locationProp].latitude;
			entityLongitude = +entity[this.markerConfig.locationProp].longitude;
		}

		// Check individual location latitude fields that will take precedence
		if (
			this.markerConfig.locationConfig &&
			entity[this.markerConfig.locationConfig.latitudeProp] &&
			entity[this.markerConfig.locationConfig.longitudeProp]
		) {
			entityLatitude = +entity[this.markerConfig.locationConfig.latitudeProp];
			entityLongitude = +entity[this.markerConfig.locationConfig.longitudeProp];
		}

		if (!entityLatitude || !entityLongitude) {
			return null;
		} else {
			return [entityLatitude, entityLongitude];
		}
	}

	private applyEventsToMarker(marker: any, entity: any, markerOptions: any) {
		marker.on('click', this.markerClick.bind(this));
		marker.on('mouseover', this.markerHighlight.bind(this));
		marker.on('mouseout', this.markerUnhighlight.bind(this));

		marker.bindTooltip(this.createLabelTooltip(entity, markerOptions));

		marker.data = entity;
	}

	private createLabelTooltip(entity: any, markerOptions) {
		const backgroundColor = markerOptions.color || 'transparent';
		const color = pickTextcolorBasedOnBackgroundColor(markerOptions.color || 'white');
		const style = `padding:0.25rem !important;background-color:${backgroundColor};color:${color};`;
		const label = this.generateLabelForEntity(entity);

		const content = `<div style="${style}">${label}</div>`;

		return tooltip({
			permanent: this.canShowTooltips(),
			direction: 'left',
			interactive: true
		})
			.setContent(content)
			.on('click', this.markerClick.bind(this))
			.on('mouseover', this.markerHighlight.bind(this))
			.on('mouseout', this.markerHighlight.bind(this));
	}

	private generateLabelForEntity(entity: any): string {
		let label;
		if (Array.isArray(this.markerConfig.labelProp)) {
			if (this.markerConfig.labelTemplate) {
				label = this.markerConfig.labelTemplate;
				this.markerConfig.labelProp.forEach(
					(lp, i) => (label = label.replace(`$${i + 1}`, entity[lp] || ''))
				);
			} else {
				label = this.markerConfig.labelProp.map((lp) => `${entity[lp]}`).join(' ');
			}
		} else {
			label = entity[this.markerConfig.labelProp || 'id'];
		}
		return label;
	}

	private generatePopoutContentForEntity(entity: any): string {
		let tooltip;

		if (this.markerConfig.tooltipProp) {
			const ttProp = this.markerConfig.tooltipProp;

			if (Array.isArray(ttProp)) {
				if (this.markerConfig.tooltipTemplate) {
					tooltip = this.markerConfig.tooltipTemplate;
					ttProp.forEach(
						(tt, i) => (tooltip = tooltip.replace(`$${i + 1}`, entity[tt] || ''))
					);
				}
			} else {
				tooltip = entity[ttProp];
			}
		} else {
			tooltip = Object.keys(entity)
				.sort()
				.map((k) => {
					return `<b>${k.toUpperCase()}</b>: ${entity[k]}`;
				})
				.join('<br/>');
		}

		return tooltip;
	}

	markerClick(e) {
		if (
			!this.markerConfig.disablePopout &&
			e.target.data &&
			!this.displayOptions.mapOptions.disableDefaultMapClick
		) {
			this.tooltipHeader = this.generateLabelForEntity(e.target.data);
			this.tooltipContent = this.generatePopoutContentForEntity(e.target.data);
			this.tooltipVisible = true;
		}

		this.itemClicked.emit(e.target.data);
		this.ngZone.run(() => {});
	}

	markerHighlight(e) {
		const target = e.target;
		if (!target) return;
		const marker = target._icon;
		const tooltip = target._tooltip && target._tooltip._container;
		const line = target.__ply;
		const highlightColor = 'var(--primary-color)';

		if (marker) {
			marker.style.zIndex = 9999;
		}
		if (tooltip) {
			tooltip.style.zIndex = 9999;
			tooltip.style.border = `3px solid ${highlightColor}`;
			tooltip.style['font-size'] = `1.1rem`;
			tooltip.style.transition = 'border 100ms cubic-bezier(0.075, 0.82, 0.165, 1)';
		}
		if (line) {
			line.setStyle({
				color: highlightColor,
				transition: 'color 1000ms cubic-bezier(0.075, 0.82, 0.165, 1)'
			});
		}

		this.itemHovered.emit(target.data);
	}

	markerUnhighlight(e) {
		const target = e.target;
		if (!target) return;
		const marker = target._icon;
		const tooltip = target._tooltip._container;
		const line = target.__ply;
		const UnhighlightColor = '#90A4AE';

		if (marker) {
			marker.style.zIndex = ``;
		}
		if (tooltip) {
			tooltip.style.zIndex = ``;
			tooltip.style.border = ``;
			tooltip.style['font-size'] = `1rem`;
			tooltip.style.transition = 'border 100ms cubic-bezier(0.075, 0.82, 0.165, 1)';
		}
		if (line) {
			line.setStyle({
				color: UnhighlightColor,
				transition: 'color 1000ms cubic-bezier(0.075, 0.82, 0.165, 1)'
			});
		}

		this.itemHovered.emit(null);
	}

	handleExternalMarkerHover(item) {
		if (!item) {
			this.markerUnhighlight({ target: this.internalHoveredMarker });

			if (!this.canShowTooltips() && this.internalHoveredMarker) {
				this.internalHoveredMarker.closeTooltip();
			}

			this.internalHoveredMarker = null;
			return;
		} else {
			this.internalHoveredMarker = <Marker>(
				this.markerLayerGroup.getLayers().find((m: any) => {
					if (!m.data || !item.id) return false;
					return m.data.id === item.id;
				})
			);

			if (!this.canShowTooltips()) {
				this.internalHoveredMarker?.openTooltip();
			}

			this.markerHighlight({ target: this.internalHoveredMarker });
		}
	}

	private generateGeoJsonStyle(feature: any) {
		// Defaults first, then if any are defined in the feature overwrite
		return {
			fillColor: 'steelblue',
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.3,
			...feature.properties
		};
	}

	private onEachGeoJsonFeature(feature, layer) {
		layer.on({
			mouseover: this.highlightGeoJsonFeature.bind(this),
			mouseout: this.resetHighlightGeoJsonFeature.bind(this),
			click: this.zoomToGeoJsonFeature.bind(this)
		});
	}

	private highlightGeoJsonFeature(e) {
		const layer = e.target;
		layer.setStyle({
			weight: 5,
			color: '#666',
			dashArray: '',
			fillOpacity: 0.5
		});

		layer.bringToFront();
	}

	private resetHighlightGeoJsonFeature(e) {
		L.geoJSON.resetStyle(e.target);
	}

	private zoomToGeoJsonFeature(e) {
		this.mapRef.fitBounds(e.target.getBounds());
	}
}
