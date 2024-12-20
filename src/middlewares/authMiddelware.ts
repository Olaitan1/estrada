import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '../utils/jwt';

export const authenticate = (req: JwtPayload, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  };
};


// export const admin = (req:Request, res:Response, next: NextFunction) => {
//   if (req.user && req.user.role === "admin") {
//     next();
//   } else {
//     return res
//       .status(403)
//       .json({ message: "Not authorized to perform this action" });
//   }
// };

// export const manager = (req:Request, res:Response, next: NextFunction) => {
//   if (req.user && req.user.role === "manager") {
//     next();
//   } else {
//     return res
//       .status(403)
//       .json({ message: "Not authorized to perform this action" });
//   }
// };