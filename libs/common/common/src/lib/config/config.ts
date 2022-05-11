interface IConfig {
  env: string;
  slack: ISlackConfig;
}

interface ISlackConfig {
  oAuthToken: string;
  secret: string;
  signingSecret: string;
}

interface ISpacelliftToSlackConfig {
  slackChannel: string;
}

class Config implements IConfig {
  private static instance: Config;
  env: string;
  slack: ISlackConfig;
  spacelliftToSlackConfig: ISpacelliftToSlackConfig;

  private constructor() {
    this.env = process.env.NODE_ENV || "development";

    this.slack = {} as ISlackConfig;
    this.slack.oAuthToken = process.env.BOSSY_SLACK_OAUTH_TOKEN;
    this.slack.secret = process.env.BOSSY_SLACK_SECRET;
    this.slack.signingSecret = process.env.BOSSY_SLACK_SIGNING_SECRET;

    this.spacelliftToSlackConfig = {} as ISpacelliftToSlackConfig;
    this.spacelliftToSlackConfig.slackChannel =
      process.env.BOSSY_SPACELIFT_TO_SLACK_CHANNEL;
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }

    return Config.instance;
  }
}

const config = Config.getInstance();

export { config };
