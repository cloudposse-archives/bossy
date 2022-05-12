import { config, expressHelpers, getLogger } from "@cloudposse/common";
import { SlackApp, slackInstance } from "@cloudposse/slack";
import { Request, Response } from "express";

import { SendSpaceliftEventsToSlackDTO } from "./sendSpaceliftEventsToSlackDTO";
import { SendSpaceliftEventsToSlackUseCase } from "./sendSpaceliftEventsToSlackUseCase";

class SendSpaceliftEventsToSlackController {
  constructor(
    private readonly useCase: SendSpaceliftEventsToSlackUseCase,
    private readonly slackService: SlackApp
  ) {}

  public async handle(
    req: Request,
    res: Response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> {
    const logger = getLogger("SendSpaceliftEventsToSlackController");
    try {
      const { body, headers } = req;
      const spaceliftSignature = headers["x-spacelift-signature"]?.toString();
      const slackChannel = config.spacelliftToSlackConfig.slackChannel;

      const dto: SendSpaceliftEventsToSlackDTO = {
        spaceliftSignature,
        slackChannel,
        webEvent: body,
      };

      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          default:
            return expressHelpers.fail(res, error.getErrorValue());
        }
      } else {
        return expressHelpers.ok(res);
      }
    } catch (err) {
      logger.error(err);
      return expressHelpers.fail(res, err);
    }
  }
}

const useCase = new SendSpaceliftEventsToSlackUseCase(slackInstance);
const sendSpaceliftEventsToSlackController =
  new SendSpaceliftEventsToSlackController(useCase, slackInstance);

export {
  sendSpaceliftEventsToSlackController,
  SendSpaceliftEventsToSlackController,
};
