import * as allEnv from "../config/env.config";

export const checkEnv = () => {
  Object.entries(allEnv).forEach(([_, value]) => {
    if (!value) {
      console.error(`Environment variable missing`);
      console.table(allEnv);
      process.exit(1);
    }
  });
};