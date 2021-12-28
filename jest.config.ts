module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "@model": ["<rootDir>/src/model"],
    "@types": ["<rootDir>/src/types"],
    "@router": ["<rootDir>/src/router"],
    "@response": ["<rootDir>/src/response"],
    "@middleware": ["<rootDir>/src/middleware"],

    "@helper/cookie": ["<rootDir>/src/helper/cookie.helper.ts"],
    "@helper/db": ["<rootDir>/src/helper/db/index.ts"],
    "@helper/env": ["<rootDir>/src/helper/env.helper.ts"],
    "@helper/security": ["<rootDir>/src/helper/security.helper.ts"],
    "@helper/server": ["<rootDir>/src/helper/server.helper.ts"],
    "@helper/token": ["<rootDir>/src/helper/token.helper.ts"],
    "@helper/validator": ["<rootDir>/src/helper/validator.helper.ts"],

    "@config/db": ["<rootDir>/src/config/db.config.ts"],
    "@config/env": ["<rootDir>/src/config/env.config.ts"],
    "@config/logger": ["<rootDir>/src/config/logger.config.ts"],
    "@config/server": ["<rootDir>/src/config/server.config.ts"],
  },
};
