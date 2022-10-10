import express from 'express';

//! imp controllers
import * as authController from '../controllers/auth';

const router = express.Router();
//@ /login => GET
router.get('/login', authController.getLogin);

//@ /post => GET
router.post('/login', authController.postLogin);

export default router;
