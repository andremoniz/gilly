import { CircleMarkerOptions, IconOptions } from 'leaflet';

import { UIVisualization } from './../ui-visualization.interface';

export interface UIMapDisplayOptions extends UIVisualization {
	mapOptions?: UIMapOptions;
	markerConfig?: UIMapMarkerConfig;
}

export interface UIMapOptions {
	layers: UIMapLayer[];

	zoom: number;
	zoomDelta: number;
	zoomWheelPercent: number;

	center: any;

	hideControls?: boolean;
	hideCustomControls?: boolean;

	overlays?: {
		[overlayName: string]: {
			type: 'geojson' | 'feature' | any;
			collection?: any[];
			options?: any;
		};
	};

	disableDefaultMapClick?: boolean;
	disableZoomFit?: boolean;

	setUrlParameters?: boolean;
}

export interface UIMapMarkerConfig {
	locationProp?: string;
	locationConfig?: UIMapLocationConfig;

	labelProp?: string | string[];
	labelTemplate?: string;

	disablePopout?: boolean;
	tooltipProp?: string | string[];
	tooltipTemplate?: string;

	tooltipZoomThreshold?: number;
	tooltipTotalThreshold?: number;

	defaultMarkerOptions?: Partial<IconOptions | CircleMarkerOptions>;
	defaultIconUrl?: string;

	markerValueProp?: string;
	dataDrivenMarkers?: UIMapDataDrivenMarker[];
	markerMap?: any;
}

interface UIMapDataDrivenMarker extends Partial<IconOptions & CircleMarkerOptions> {
	valueProp: string;
	value: any;
	shape?: string;
	fontAwesomeIcon?: string;
	iconOptions?: Partial<IconOptions>;
	markerOptions?: Partial<CircleMarkerOptions>;
}

export interface UIMapLayer {
	type?: string;
	url?: string;
	maxZoom?: number;
	attribution?: string;
	default?: boolean;
	name?: string;
	options?: any;
}

export interface UIMapLocationConfig {
	latitudeProp: string;
	longitudeProp: string;
}
