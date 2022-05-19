import { Either, Result, AppError } from "@cloudposse/common";

import { SendSpaceliftEventsToSlackErrors } from "./sendSpaceliftEventsToSlackErrors";

export type SendSpaceliftEventsToSlackResponse = Either<
  | SendSpaceliftEventsToSlackErrors.InvalidSpaceliftSignatureError
  | SendSpaceliftEventsToSlackErrors.SlackApiError
  | AppError.UnexpectedError
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | Result<any>,
  Result<void>
>;
