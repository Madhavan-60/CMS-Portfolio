import { supabase } from '../config/supabase.js';
import { v4 as uuidv4 } from 'uuid';

export const submitMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ message: 'name, email, message required' });
    const { data, error } = await supabase.from('messages').insert({ id: uuidv4(), name, email, message }).select();
    if (error) throw error;
    return res.status(201).json(data[0]);
  } catch (err) { return next(err); }
};

export const listMessages = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return res.json(data);
  } catch (err) { return next(err); }
};
