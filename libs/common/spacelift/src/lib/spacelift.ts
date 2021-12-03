import { ISpaceliftWebhookPayload } from "./interfaces";

const state = (payload: ISpaceliftWebhookPayload) => payload.state;

const isFinished = (payload: ISpaceliftWebhookPayload): boolean =>
  state(payload).toLowerCase() === "finished";

export { isFinished, state };
