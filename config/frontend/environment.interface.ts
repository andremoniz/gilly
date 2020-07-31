import { MapOptions } from 'leaflet';

export interface BaseEnvironment {
	production: boolean;

	serverUrl: string;
	authUrl: string;
	dataUrl: string;

	mapOptions?: MapOptions | any;

	appTitle?: string;
	appLogo?: string;

	userMetrics?: boolean;
}
