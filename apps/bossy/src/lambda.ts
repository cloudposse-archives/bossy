import { createLogger } from "@cloudposse/common";
import serverlessExpress from "@vendia/serverless-express";

import { app } from "./app";

createLogger("main").info("bossy app starting up");
const handler = serverlessExpress({ app });

export { handler };
