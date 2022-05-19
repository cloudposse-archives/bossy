const config = process.env.NODE_ENV === "test" ? { path: `./.env.test` } : {};
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config(config);

import { getLogger } from "@cloudposse/common";
import serverlessExpress from "@vendia/serverless-express";

import { app } from "./app";

getLogger("main").info("bossy app starting up");
const handler = serverlessExpress({ app });

export { handler };
