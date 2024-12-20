import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddelware';
import {
  createTask,
  getUserTasks,
  getAllTasks,
  deleteTask,
  updateTask,
} from "../controllers/taslkController";


const router:any = Router();


router.post('/', authenticate, createTask);


router.get('/user', authenticate, getUserTasks);

router.get('/', authenticate, getAllTasks);
router.delete('/delete-task/:id', authenticate, deleteTask);
router.put('/update-task/:id', authenticate, updateTask);

export default router;
