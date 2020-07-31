import { BaseEnvironmentProd } from './../../../../config/frontend/environment.prod';

export const environment = {
	...BaseEnvironmentProd,

	production: true,

	appTitle: 'Admin',
	appLogo: './assets/appLogo.png'
};
