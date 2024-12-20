// src/controllers/authController.ts
import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';
import { v4 as uuidv4 } from "uuid";
import { JwtPayload } from 'jsonwebtoken';
import { option, registerSchema } from '../utils/utility';


// Sign up
export const signUp = async (req: JwtPayload, res: Response) => {
  try {
    const { email, password, name, role } = req.body;

    const validateEmail = registerSchema.validate(req.body, option);
    if (validateEmail.error) {
      //  return res.status(400).json({ msg: "invalid email" });
      return res
        .status(400)
        .json({ Error: validateEmail.error.details[0].message });
    }
    // Check if the email already exists
    
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use' });
    }
    const newUser = await User.create({
      id: uuidv4(),
      email,
      password,
      name: name || "",
      role: role || 'user',
    });

    const token = generateToken(newUser.id, newUser.role);

    // res.status(201).json({ token });
      return res.status(201).json({
        message:
          "User Created Successfully",
        token,
        newUser
      });
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
};

// Login
export const login = async (req: JwtPayload, res: Response) => {
  try {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({
            message:"please fill all the required fields"
        })
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id, user.role);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
