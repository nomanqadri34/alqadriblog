import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

// Manually set the JWT secret key
const JWT_SECRET = "4F5GRGTBY6H"; // Replace with a strong secret

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, 'Unauthorized: No token provided'));
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, 'Unauthorized: Invalid token'));
    }
    req.user = user;
    next();
  });
};

