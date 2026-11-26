import { Router } from 'express';
import { EnvironmentController } from '../controllers/environment.controller';

const router = Router();

router.get('/', EnvironmentController.getAllEnvironments);
router.post('/', EnvironmentController.createEnvironment);
router.patch('/:id', EnvironmentController.updateEnvironmentPartial);

export default router;