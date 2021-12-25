import { connection, connect } from "mongoose";

import { DB_URL } from "@config/env";
import { logger } from "@config/logger";

export const dbConnect = (): void => {
  connect(DB_URL as string);

  connection.on("open", () => {
    logger.info("DB connection established successfully");
  });

  connection.on("error", () => {
    console.log("Error establishing DB connection");
    process.exit(1);
  });
};

export const dbDrop = async (): Promise<void> => {
  await connection.dropDatabase();
  await connection.close();
};
