import { connection } from "mongoose";

import { server } from "./config/server.config";
import { API_PORT } from "./config/env.config";

connection.on("open", () => {
  server.listen(API_PORT, () => {
    console.log(`TODO API listening at http://localhost:${API_PORT}`);
  });
});
