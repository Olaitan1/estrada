import { Request, Response } from 'express';
import Task from '../models/task';
import { JwtPayload } from 'jsonwebtoken';
import { createTaskSchema, updateTaskSchema } from '../utils/utility';
import { Op } from "sequelize";


// Create Task
export const createTask = async (req: JwtPayload, res: Response) => {
  const { title, description, dueDate } = req.body;

  const { error } = createTaskSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

  try {
    const task = await Task.create({
      title,
      description,
      dueDate,
      userId: req.user.userId,
    });
    res.status(201).json(task);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
};



// Get User's Tasks
export const getUserTasks = async (req: JwtPayload, res: Response) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin Get All Tasks with Filtering and Pagination
export const getAllTasks = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, status, search } = req.query;

  try {
    // Check if the user is an admin
    if (req.user.role  !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to view all tasks" });
    }

    const whereCondition: any = {};

    if (status) {
      whereCondition.status = status;
    }

    if (search) {
      whereCondition.title = { [Op.iLike]: `%${search}%` };
    }

    const tasks = await Task.findAndCountAll({
      where: whereCondition,
      limit: parseInt(limit as string, 10),
      offset:
        (parseInt(page as string, 10) - 1) * parseInt(limit as string, 10),
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      tasks: tasks.rows,
      total: tasks.count,
      page: parseInt(page as string, 10),
      totalPages: Math.ceil(tasks.count / parseInt(limit as string, 10)),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


//update task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const { title, description, dueDate, status } = req.body;

    const { error } = updateTaskSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

   const task = await Task.findOne({
     where: req.user.role === "admin" ? { id } : { id, userId },
   });

   if (!task) {
     return res
       .status(404)
       .json({ message: "Task not found or access denied" });
   }


    await task.update({ title, description, dueDate, status });

    return res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", route: "/tasks/:id" });
  }
};

// Delete task
export const deleteTask = async (req: JwtPayload, res: Response) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (req.user.role !== "admin" && task.userId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this task" });
    }

    await task.destroy();

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};