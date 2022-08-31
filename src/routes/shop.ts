import express, { Request, Response, NextFunction } from 'express';
import Logging from '../library/Logging';
//! imp HTML
import path from 'path';
const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  //! using Slash for the rootPath, an absolute path seen from the Root Folder
  //! __dirname this is Global Variable that holds the Absolute Path on Operating System to this Project Folder.
  const pathFile = path.join(__dirname, '../', 'views', 'shop.html');
  Logging.info(pathFile);
  res.sendFile(pathFile);
});

export default router;
