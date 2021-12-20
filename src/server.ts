import { connection } from "mongoose";

import { server } from "./config/server.config";
import { API_PORT } from "./config/env.config";
import { logger } from "./config/logger.config";
import { dbConnect } from "./config/db.config";

dbConnect();
connection.on("open", () => {
  server.listen(API_PORT, () => {
    logger.info(`TODO API listening at http://localhost:${API_PORT}`);
  });
});
