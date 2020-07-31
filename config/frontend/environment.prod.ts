import { BaseEnvironment } from './environment.interface';

const serverUrl = '..';

export const BaseEnvironmentProd: BaseEnvironment = {
	production: true,

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
