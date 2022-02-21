import { connection } from "mongoose";

import { PORT } from "@config/env";
import { dbConnect } from "@config/db";
import { server } from "@config/server";
import { logger } from "@config/logger";

dbConnect();
connection.on("open", () => {
  server.listen(PORT, () => {
    logger.info(`TODO API listening at http://localhost:${PORT}`);
  });
});
