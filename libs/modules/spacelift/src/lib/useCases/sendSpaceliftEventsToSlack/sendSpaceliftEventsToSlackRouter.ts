import { Router } from "express";

import { sendSpaceliftEventsToSlackController } from "./sendSpaceliftEventsToSlackController";

const sendSpaceliftEventsToSlackRouter = Router();

sendSpaceliftEventsToSlackRouter.post("/", async (req, res) =>
  sendSpaceliftEventsToSlackController.handle(req, res)
);

export { sendSpaceliftEventsToSlackRouter };
