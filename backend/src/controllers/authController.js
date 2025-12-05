import bcrypt from 'bcryptjs';
import { supabase } from '../config/supabase.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const { data: users, error } = await supabase.from('users').select('*').eq('email', email).limit(1);
    if (error) throw error;
    const user = users?.[0];
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);
    return res.json({ accessToken, refreshToken, user: { id: user.id, email: user.email } });
  } catch (err) {
    return next(err);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: 'refreshToken required' });
    const payload = verifyRefreshToken(refreshToken);
    const { data: users, error } = await supabase.from('users').select('*').eq('id', payload.id).limit(1);
    if (error) throw error;
    const user = users?.[0];
    if (!user) return res.status(401).json({ message: 'User not found' });
    const accessToken = signAccessToken(user);
    return res.json({ accessToken });
  } catch (err) {
    err.status = 401;
    return next(err);
  }
};
