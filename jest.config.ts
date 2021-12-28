import { compilerOptions } from "./paths.tsconfig.json";
import { pathsToModuleNameMapper } from "ts-jest";

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/src",
  }),
};
