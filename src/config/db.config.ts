import { connection, connect } from "mongoose";

import { DB_URL } from "./env.config";
import { logger } from "./logger.config";

export const dbConnect = () => {
  connect(DB_URL as string);

  connection.on("open", () => {
    logger.info("DB connection established successfully");
  });

  connection.on("error", () => {
    console.log("Error establishing DB connection");
    process.exit(1);
  });
};

export const dbDrop = async () => {
  await connection.dropDatabase();
  await connection.close();
};
