import {
  AppError,
  Guard,
  left,
  Result,
  right,
  stringHelpers,
  UseCase,
} from "@cloudposse/common";
import { ISlackApp, SlackMessagePayload } from "@cloudposse/slack";
import { ISpaceliftWebhookPayload } from "@cloudposse/spacelift";
import { SectionBlock } from "@slack/types";

import { SendSpaceliftEventsToSlackDTO } from "./sendSpaceliftEventsToSlackDTO";
import { SendSpaceliftEventsToSlackErrors } from "./sendSpaceliftEventsToSlackErrors";
import { SendSpaceliftEventsToSlackResponse } from "./sendSpaceliftEventsToSlackResponse";

export class SendSpaceliftEventsToSlackUseCase
  implements
    UseCase<
      SendSpaceliftEventsToSlackDTO,
      Promise<SendSpaceliftEventsToSlackResponse>
    >
{
  constructor(private slackApp: ISlackApp) {}

  public async execute(
    req: SendSpaceliftEventsToSlackDTO
  ): Promise<SendSpaceliftEventsToSlackResponse> {
    try {
      const payload = req.webEvent;
      const validateRequiredParamsOrError = Guard.againstNullOrUndefinedBulk([
        { argument: payload.run?.triggeredBy, argumentName: "triggeredBy" },
        { argument: payload.stack?.id, argumentName: "stackId" },
        { argument: payload.run?.commit?.url, argumentName: "commitUrl" },
      ]);

      if (validateRequiredParamsOrError.isFailure) {
        return left(validateRequiredParamsOrError);
      }

      const message = generateSlackMessage(payload);

      try {
        const result = await this.slackApp.sendMessage(
          req.slackChannel,
          message.text,
          message.blocks
        );

        if (!result.ok) {
          return left(
            new SendSpaceliftEventsToSlackErrors.SlackApiError(result.error)
          );
        }
      } catch (err) {
        return left(
          new SendSpaceliftEventsToSlackErrors.SlackApiError(
            (err as Error).message
          )
        );
      }

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}

const spaceliftStateToSlackStatus = (
  payload: ISpaceliftWebhookPayload
): string => {
  const { state } = payload;

  switch (state) {
    case "UNCONFIRMED": {
      return "Awaiting Approval :clock1:";
    }
    case "DISCARDED": {
      return "Discarded :trash_can:";
    }
    case "CONFIRMED": {
      return "Approved :+1:";
    }
    case "FINISHED": {
      return "Finished :white_check_mark:";
    }
    case "FAILED": {
      return "Failed :x:";
    }
    default: {
      // Title case
      return stringHelpers.toTitleCase(state);
    }
  }
};

const generateSlackMessage = (
  event: ISpaceliftWebhookPayload
): SlackMessagePayload => {
  const triggeredBy = event.run.triggeredBy ?? "Git";
  const repo = event.run.commit.url.split("/")[4]; // Really hacky, but works for Github
  const status = spaceliftStateToSlackStatus(event);
  const text = `${event.stack.id} is ${status}`;
  const messageBlock: SectionBlock = {
    type: "section",
    fields: [
      {
        type: "mrkdwn",
        text: `*Stack:* <${event.run.commit.url}|${event.stack.id}>`,
      },
      {
        type: "mrkdwn",
        text: `*State:* ${status}`,
      },
      {
        type: "mrkdwn",
        text: `*Triggered by:* ${triggeredBy}`,
      },
      {
        type: "mrkdwn",
        text: `*Code:* <${event.run.commit.url}|${repo} @ ${event.run.commit.message}>`,
      },
    ],
  };

  return {
    text,
    blocks: [messageBlock],
  };
};
