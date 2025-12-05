import { supabase } from '../config/supabase.js';
import { v4 as uuidv4 } from 'uuid';

// Factory helpers for CRUD tables with id primary keys
export const makeList = (table) => async (req, res, next) => {
  try {
    const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return res.json(data);
  } catch (err) { return next(err); }
};

export const makeCreate = (table) => async (req, res, next) => {
  try {
    const payload = { id: uuidv4(), ...req.body };
    const { data, error } = await supabase.from(table).insert(payload).select();
    if (error) throw error;
    return res.status(201).json(data[0]);
  } catch (err) { return next(err); }
};

export const makeUpdate = (table) => async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from(table).update(req.body).eq('id', id).select();
    if (error) throw error;
    if (!data?.length) return res.status(404).json({ message: 'Not found' });
    return res.json(data[0]);
  } catch (err) { return next(err); }
};

export const makeRemove = (table) => async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) throw error;
    return res.status(204).send();
  } catch (err) { return next(err); }
};
