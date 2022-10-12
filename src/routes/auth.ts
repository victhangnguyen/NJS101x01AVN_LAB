import express from 'express';

//! imp controllers
import * as authController from '../controllers/auth';

const router = express.Router();
//@ /login => GET
router.get('/login', authController.getLogin);

//@ /login => GET
router.post('/login', authController.postLogin);

//@ /logout => POST
router.post('/logout', authController.postLogout);

export default router;
