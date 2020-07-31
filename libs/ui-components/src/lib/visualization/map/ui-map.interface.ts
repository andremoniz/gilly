export interface UIMapOptions {
	layers: UIMapLayer[];
	zoom: number;
	center: any;
}

export interface UIMapLayer {
	type?: string;
	url?: string;
	maxZoom?: number;
	attribution?: string;
}

export interface UIMapDisplayOptions {
	locationProp: string;
	labelProp?: string;

	mapOptions?: UIMapOptions
}
