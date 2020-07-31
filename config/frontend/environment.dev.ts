import { BaseEnvironment } from './environment.interface';

const serverUrl = 'http://localhost:1337';

export const BaseEnvironmentDev: BaseEnvironment = {
	production: false,

	serverUrl: serverUrl,
	authUrl: `${serverUrl}/auth/login`,
	dataUrl: `${serverUrl}/data`,

	mapOptions: {
		layers: [
			{
				type: 'tile',
				url: 'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
				maxZoom: 18
			}
		],
		zoom: 1,
		center: [0, 0]
	},

	userMetrics: true
};
