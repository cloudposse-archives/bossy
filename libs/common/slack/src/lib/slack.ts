import { config } from "@cloudposse/common";
import { App, AppOptions } from "@slack/bolt";
import { Block, ChatPostMessageResponse, WebClient } from "@slack/web-api";

interface ISlackApp {
  app: App;
  client: WebClient;
  sendMessage(
    channel: string,
    text: string,
    blocks: Block[]
  ): Promise<ChatPostMessageResponse>;
}

interface SlackMessagePayload {
  text: string;
  blocks: Block[];
}

class SlackApp implements ISlackApp {
  public app: App;
  public client: WebClient;

  public constructor(opts?: AppOptions) {
    this.app = new App(opts);
    this.client = this.app.client;
  }

  public sendMessage(
    channel: string,
    text: string,
    blocks: Block[]
  ): Promise<ChatPostMessageResponse> {
    return this.client.chat.postMessage({ channel, text, blocks });
  }
}

const { oAuthToken, secret, signingSecret } = config.slack;

const slackInstance = new SlackApp({
  clientSecret: secret,
  signingSecret,
  token: oAuthToken,
});

export { ISlackApp, SlackApp, slackInstance, SlackMessagePayload };
