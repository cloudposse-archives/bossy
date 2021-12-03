import nodeConfig from "config";

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
    this.env = nodeConfig.get<string>("env");

    this.slack = {} as ISlackConfig;
    this.slack.oAuthToken = nodeConfig.get<string>("slack.oauth_token");
    this.slack.secret = nodeConfig.get<string>("slack.secret");
    this.slack.signingSecret = nodeConfig.get<string>("slack.signing_secret");

    this.spacelliftToSlackConfig = {} as ISpacelliftToSlackConfig;
    this.spacelliftToSlackConfig.slackChannel = nodeConfig.get<string>(
      "spaceliftToSlack.slack_channel"
    );
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
