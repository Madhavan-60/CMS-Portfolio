import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const signAccessToken = (user) =>
  jwt.sign({ id: user.id, email: user.email }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

export const signRefreshToken = (user) =>
  jwt.sign({ id: user.id, email: user.email }, env.jwtRefreshSecret, { expiresIn: env.jwtRefreshExpiresIn });

export const verifyRefreshToken = (token) => jwt.verify(token, env.jwtRefreshSecret);
