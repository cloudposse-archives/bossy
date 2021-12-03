/* eslint-disable @typescript-eslint/no-namespace */
import { Result, UseCaseError } from "@cloudposse/common";

export namespace SendSpaceliftEventsToSlackErrors {
  export class InvalidSpaceliftSignatureError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `The Spacelift signature is invalid.`,
      } as UseCaseError);
    }
  }

  export class SlackApiError extends Result<UseCaseError> {
    constructor(errMessage: string) {
      const message = `An error occurred when calling the Slack API: ${errMessage}.`;
      super(false, {
        message,
      } as UseCaseError);
    }
  }
}
