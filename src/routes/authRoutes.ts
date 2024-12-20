import { Router } from 'express';
import { login, signUp } from '../controllers/authController';


const router:any = Router();

// Sign up route
router.post('/signup', signUp);

// Login route
router.post('/login', login);

export default router;
