import { createProxyMiddleware } from 'http-proxy-middleware';
import { ProxyUrl } from '../interfaces/proxy-url';

require('dotenv').config();

export const setupProxies = (app) => {
	let proxyUrls: ProxyUrl[];
	try {
		proxyUrls = process.env.PROXY_URLS ? JSON.parse(process.env.PROXY_URLS) : null;

		if (proxyUrls?.length) {
			proxyUrls.forEach((proxyUrl) => {
				app.use(
					proxyUrl.route,
					createProxyMiddleware({
						target: proxyUrl.target,
						secure: false,
						changeOrigin: true,
						headers: {
							Connection: 'keep-alive'
						},
						...proxyUrl.options
					})
				);
			});
		}
	} catch (e) {
		console.error('ERROR: Failed parsing PROXY_URLS', e);
	}
};
