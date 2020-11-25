import { Router } from 'express';

import { MetaController } from '../controllers/metaController';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';

const router = Router();

const metaController = new MetaController();

router.get(
	'/',
	[checkJwt, checkRole(['superadmin'])],
	metaController.getAllEntitiesMetadata.bind(metaController)
);

// Get Metadata for entity
router.get(
	'/:entity',
	[checkJwt, checkRole(['superadmin'])],
	metaController.getEntityMetadata.bind(metaController)
);

router.get(
	'/values/unique/:entity/:prop',
	[checkJwt, checkRole(['superadmin', 'admin', 'user'])],
	metaController.getUniqueValuesForPropInEntity.bind(metaController)
);

export default router;
