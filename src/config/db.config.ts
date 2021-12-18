import { connection, connect } from "mongoose";

import { DB_URL } from "./env.config";

export const dbConnect = () => {
  connect(DB_URL as string);

  connection.on("open", () => {
    console.log("DB connection established successfully");
  });

  connection.on("error", () => {
    console.log("Error establishing DB connection");
    process.exit(1)
  });
};
