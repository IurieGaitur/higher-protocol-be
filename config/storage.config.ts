import { Logger } from "@nestjs/common";
import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuid } from 'uuid';

export class DiskStorageUtil {
    static uniqueName(req, file, cb) {
      cb(null, `${uuid()}${extname(file.originalname)}`);
    }
}