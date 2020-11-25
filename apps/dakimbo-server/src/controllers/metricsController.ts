import { Request, Response } from 'express';

import { Database } from './../database/database';

export class MetricsController {
	async getMetricsFor(req: Request, res: Response) {
		const metricToFind = req.params.metricName;

		try {
			const metricRepo = Database._connection.getRepository(metricToFind);
			const metrics = await metricRepo.find();
			console.log(`METRICS FETCHED: ${metricToFind} --- FOUND: ${metrics.length}`);
			res.send(metrics);
		} catch (error) {
			res.status(500).send(error);
			console.log(`FAILED: Metrics fetch for ${metricToFind}`);
		}
	}
}
