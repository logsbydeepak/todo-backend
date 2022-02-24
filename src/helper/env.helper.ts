import * as allEnv from "@config/env";

// stop program if env is missing
const checkEnv = () => {
  Object.entries(allEnv).forEach((element) => {
    const value = element[1];
    if (!value) {
      /* eslint no-console: ["error", { allow: ["error", "table"] }] */
      console.error(`Environment variable missing`);
      console.table(allEnv);
      process.exit(1);
    }
  });
};

export default checkEnv;
