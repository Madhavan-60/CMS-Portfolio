import multer from 'multer';
import { supabase } from '../config/supabase.js';
import { env } from '../config/env.js';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.memoryStorage();
export const uploadMiddleware = multer({ storage });

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const ext = req.file.originalname.split('.').pop();
    const filename = `${uuidv4()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from(env.supabaseBucket)
      .upload(filename, req.file.buffer, {
        contentType: req.file.mimetype,
        cacheControl: '3600',
        upsert: false,
      });
    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase.storage.from(env.supabaseBucket).getPublicUrl(filename);
    // also log in media table
    await supabase.from('media').insert({ id: uuidv4(), url: publicUrlData.publicUrl, filename });

    return res.status(201).json({ url: publicUrlData.publicUrl });
  } catch (err) { return next(err); }
};
