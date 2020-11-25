import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';
import { MetricsController } from '../controllers/metricsController';

const router = Router();

const metricsController = new MetricsController();

// Get specific metric
router.get(
	'/:metricName',
	[checkJwt, checkRole(['superadmin'])],
	metricsController.getMetricsFor.bind(metricsController)
);

export default router;
