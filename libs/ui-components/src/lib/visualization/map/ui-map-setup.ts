import { latLng, PointExpression, tileLayer } from 'leaflet';

import { UIMapLayer, UIMapMarkerConfig, UIMapOptions } from './ui-map.interface';

// Default CONSTANTS
const radius = 50000;
const stroke = true;
const color = '#333333';
const weight = 3;
const opacity = 1;
const fill = true;
const fillColor = '#999999';
const fillOpacity = 0.5;
const iconSize: PointExpression = [24, 24];
const iconAnchor: PointExpression = [12, 12];

export function setupMarkerConfig(mc: UIMapMarkerConfig) {
	let markerConfig: UIMapMarkerConfig = {
		defaultMarkerOptions: {
			radius: radius,
			stroke: stroke,
			color: color,
			weight: weight,
			opacity: opacity,
			fill: fill,
			fillColor: fillColor,
			fillOpacity: fillOpacity,
			iconSize: iconSize,
			iconAnchor: iconAnchor
		}
	};
	Object.assign(markerConfig, mc);

	if (markerConfig.dataDrivenMarkers) {
		markerConfig.markerMap = {};

		markerConfig.dataDrivenMarkers.forEach((m) => {
			const markerOptions = { ...markerConfig.defaultMarkerOptions };
			if (m.markerOptions) {
				Object.assign(markerOptions, m.markerOptions);
			}
			markerConfig.markerMap[m.value] = markerOptions;
		});
	}

	return markerConfig;
}

export function setupMapOptions(mapOptions: UIMapOptions) {
	if (!mapOptions) return null;

	const baseLayers = generateLayers(mapOptions.layers);
	const baseMap = {};
	baseLayers.forEach((bl, i) => (baseMap[bl.name] = bl.layer));
	const defaultLayer = baseLayers.find((bl) => bl.default);

	return {
		...mapOptions,
		layers: defaultLayer ? defaultLayer.layer : baseLayers.map((bl) => bl.layer)[0],
		worldCopyJump: true,
		zoom: mapOptions.zoom,
		zoomSnap: 0,
		zoomDelta: mapOptions.zoomDelta || 0.25,
		wheelDebounceTime: 10,
		wheelPxPerZoomLevel: mapOptions.zoomWheelPercent ? (60 / mapOptions.zoomWheelPercent) : 60,
		center: latLng(mapOptions.center[0], mapOptions.center[1]),
		baseLayers: baseMap
	};
}

const generateLayers = (mapOptionLayers: UIMapLayer[]) => {
	return mapOptionLayers.map((l, i) => {
		let layer;

		switch (l.type.toLowerCase()) {
			case 'tile':
				layer = tileLayer(l.url, {
					maxZoom: l.maxZoom || 18,
					attribution: l.attribution || ''
				});
				break;
			case 'wms':
				layer = tileLayer.wms(l.url, l.options);
				break;
			default:
				break;
		}

		return { ...l, name: l.name || i, layer };
	});
};
