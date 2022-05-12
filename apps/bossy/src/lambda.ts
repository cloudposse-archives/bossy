// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

import { getLogger } from "@cloudposse/common";
import serverlessExpress from "@vendia/serverless-express";

import { app } from "./app";

getLogger("main").info("bossy app starting up");
const handler = serverlessExpress({ app });

export { handler };
