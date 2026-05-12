import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(process.cwd(), '..', 'uploads'));
  },
  filename: (_req, file, cb) => {
    const sanitized = file.originalname.replace(/\s+/g, '-').toLowerCase();
    cb(null, `${Date.now()}-${sanitized}`);
  }
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});
