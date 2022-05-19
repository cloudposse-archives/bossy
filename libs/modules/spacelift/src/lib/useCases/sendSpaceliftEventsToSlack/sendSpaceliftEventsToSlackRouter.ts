import { Router } from "express";

import { sendSpaceliftEventsToSlackController } from "./sendSpaceliftEventsToSlackController";

const sendSpaceliftEventsToSlackRouter = Router();

sendSpaceliftEventsToSlackRouter.post(
  "/",
  async (req, res) =>
    await sendSpaceliftEventsToSlackController.handle(req, res)
);

export { sendSpaceliftEventsToSlackRouter };
