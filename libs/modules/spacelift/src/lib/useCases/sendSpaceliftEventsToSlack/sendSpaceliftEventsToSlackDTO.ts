import { ISpaceliftWebhookPayload } from "@cloudposse/spacelift";
interface SendSpaceliftEventsToSlackDTO {
  slackChannel: string;
  spaceliftSignature: string;
  webEvent: ISpaceliftWebhookPayload;
}

export { SendSpaceliftEventsToSlackDTO };
