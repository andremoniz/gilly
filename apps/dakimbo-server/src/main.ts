import 'reflect-metadata';

import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import helmet from 'helmet';

import config from './config';
import { Database } from './database/database';
import { setupProxies } from './middlewares/setupProxies';
import routes from './routes';

require('./utilities/logStamp');
require('dotenv').config();

(async () => {
	const db = new Database();
	await db.connect(<any>config.dbOptions);

	const app = express();

	setupProxies(app);

	// MIDDLEWARE
	// app.use(morgan('dev'));
	app.use(cors());
	app.use(helmet());
	app.use(compression());
	app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
	app.use(bodyParser.json({ limit: '100mb' }));

	app.use(
		fileUpload({
			limits: { fileSize: 50 * 1024 * 1024 }
			// useTempFiles: true,
			// tempFileDir: '/temp',
			// createParentPath: true
		})
	);

	// ROUTES
	app.use(express.static(__dirname + '/public'));
	app.use('/', routes);
	app.get('*', (req, res) => {
		res.sendFile(__dirname + '/public/index.html');
	});

	// SERVERS
	const httpServer = app.listen(config.port, () => {
		return console.log(`HTTP Server is listening on ${config.port}`);
	});
	httpServer.on('error', console.error);

	const https = require('https');
	const httpsServer = https.createServer(config.httpsOpts, app).listen(config.portSSL, () => {
		return console.log(`HTTPS Server is listening on ${config.portSSL}`);
	});
	httpsServer.on('error', console.error);
})();
