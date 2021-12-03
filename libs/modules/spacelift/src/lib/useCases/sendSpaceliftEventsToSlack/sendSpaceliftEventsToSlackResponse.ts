import { Either, Result, AppError } from "@cloudposse/common";

import { SendSpaceliftEventsToSlackErrors } from "./sendSpaceliftEventsToSlackErrors";

export type SendSpaceliftEventsToSlackResponse = Either<
  | SendSpaceliftEventsToSlackErrors.InvalidSpaceliftSignatureError
  | SendSpaceliftEventsToSlackErrors.SlackApiError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;
