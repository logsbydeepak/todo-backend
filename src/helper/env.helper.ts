import * as allEnv from "@config/env";

export const checkEnv = (): void => {
  Object.entries(allEnv).forEach(([_, value]) => {
    if (!value) {
      console.error(`Environment variable missing`);
      console.table(allEnv);
      process.exit(1);
    }
  });
};
