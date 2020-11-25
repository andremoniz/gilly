import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { ProxyUrl } from './../interfaces/proxy-url';
import auth from './authRoute';
import data from './dataRoute';
import media from './mediaRoute';
import meta from './metaRoute';
import metrics from './metricsRoute';
import user from './userRoute';

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/data', data);
routes.use('/meta', meta);
routes.use('/metrics', metrics);
routes.use('/media', media);

export default routes;
