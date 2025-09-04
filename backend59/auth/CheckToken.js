import jwt from 'jsonwebtoken';
import { GeneralServerError } from '../exceptions/GeneralErrors.js';

export const checkToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    next(new GeneralServerError(401, 'Access denied. No token provided.'));
    return;
  }

  const token = authHeader.split(' ')[1]; // Extract the token after "Bearer"

  if (!token) {
    next(new GeneralServerError(401, 'Access denied. Token is missing'));
    return;
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
    req.user = decoded; // Attach the decoded user information to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    next(new GeneralServerError(403, 'Access denied. Invalid or expired token'));
    return;
  }
};