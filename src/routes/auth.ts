import express from 'express';

//! imp controllers
import * as authController from '../controllers/auth';

const router = express.Router();
//@ /login => GET
router.get('/login', authController.getLogin);

//@ /signup => GET
router.get('/signup', authController.getSignup);

//@ /login => POST
router.post('/login', authController.postLogin);

//@ /signtup => POST
router.post('/signup', authController.postSignup);

//@ /logout => POST
router.post('/logout', authController.postLogout);

export default router;
