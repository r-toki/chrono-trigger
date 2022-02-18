import { pathBuilder } from "@rei-sogawa/path-builder";

const INDEX = "/";
const SETTINGS = "/settings";

export const routes = {
  [INDEX]: {
    path: pathBuilder(INDEX),
    Component: "",
  },
  [SETTINGS]: {
    path: pathBuilder(SETTINGS),
    Component: "",
  },
};
