import * as allEnv from "@config/env";

// stop program if env is missing
export const checkEnv = (): void => {
  Object.entries(allEnv).forEach(([_, value]) => {
    if (!value) {
      console.error(`Environment variable missing`);
      console.table(allEnv);
      return process.exit(1);
    }
  });
};
