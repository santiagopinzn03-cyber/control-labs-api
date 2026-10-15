import { Router } from 'express';
import { UserController } from '../controllers/user.controller'

const router = Router();

router.get('/', UserController.getAllUsers);
router.post('/', UserController.createUser);
router.get('/:id', UserController.getUserById);
router.patch('/:id', UserController.updateUserPartial);
router.delete('/:id', UserController.deleteUserLogical);

export default router;