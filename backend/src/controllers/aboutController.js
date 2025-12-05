import { supabase } from '../config/supabase.js';

// Single row about table (id fixed to 1)
const ABOUT_ID = 'about-single';

export const getAbout = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('about').select('*').eq('id', ABOUT_ID).single();
    if (error && error.code !== 'PGRST116') throw error; // table empty
    return res.json(data || null);
  } catch (err) { return next(err); }
};

export const updateAbout = async (req, res, next) => {
  try {
    const payload = { id: ABOUT_ID, ...req.body };
    const { data, error } = await supabase.from('about').upsert(payload).select().single();
    if (error) throw error;
    return res.json(data);
  } catch (err) { return next(err); }
};
