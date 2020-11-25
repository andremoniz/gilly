import { Router } from 'express';

import { MediaController } from '../controllers/mediaController';
import { checkJwt } from '../middlewares/checkJwt';

const router = Router();

const mediaController = new MediaController();

// Upload Media
router.post('/', [checkJwt], mediaController.uploadMedia.bind(mediaController));

router.post('/:entity', [checkJwt], mediaController.uploadMedia.bind(mediaController));

router.post('/:entity/:id', [checkJwt], mediaController.uploadMedia.bind(mediaController));

export default router;
