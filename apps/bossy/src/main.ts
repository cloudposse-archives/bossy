import { createLogger } from "@cloudposse/common";

import { app } from "./app";

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  createLogger("main").info(`bossy app listening at http://localhost/${port}`);
});

server.on("error", console.error);
