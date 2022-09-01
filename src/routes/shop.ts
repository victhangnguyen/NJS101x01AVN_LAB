//! imp core modules
import path from 'path';

import express, { Request, Response, NextFunction } from 'express';

//! utils - libs
import rootDir from '../utils/path';
import Logging from '../library/Logging';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  //! using Slash for the rootPath, an absolute path seen from the Root Folder
  //! __dirname this is Global Variable that holds the Absolute Path on Operating System to this Project Folder.
  const pathFile = path.join(rootDir, 'views', 'shop.html');
  res.sendFile(pathFile);
});

export default router;
