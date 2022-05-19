import { ISlackApp } from "@cloudposse/slack";
import { ChatPostMessageResponse } from "@slack/web-api";
import { Mock, It, Times } from "moq.ts";

import * as fixture from "./fixtures/SpaceliftEvent.json";
import { SendSpaceliftEventsToSlackDTO } from "./sendSpaceliftEventsToSlackDTO";
import { SendSpaceliftEventsToSlackUseCase } from "./sendSpaceliftEventsToSlackUseCase";

describe("sendSpaceliftEventsToSlack", () => {
  describe("green path", () => {
    it("sends slack message", async () => {
      const slackMock = new Mock<ISlackApp>()
        .setup((app) => app.sendMessage(It.IsAny(), It.IsAny(), It.IsAny()))
        .returns(Promise.resolve({ ok: true } as ChatPostMessageResponse));

      const useCase = new SendSpaceliftEventsToSlackUseCase(slackMock.object());
      const payload: SendSpaceliftEventsToSlackDTO = {
        spaceliftSignature: "",
        slackChannel: "fakeChannel",
        webEvent: { ...fixture },
      };

      const result = await useCase.execute(payload);

      expect(result.value.isSuccess).toBeTruthy();
      expect(
        slackMock.verify(
          (v) => v.sendMessage(It.IsAny(), It.IsAny(), It.IsAny()),
          Times.Once()
        )
      ).toBeTruthy();
    });
  });

  describe("red path", () => {
    it("throws when a slack error occurs", async () => {
      const errorText = "This is an error";
      const slackMock = new Mock<ISlackApp>()
        .setup((app) => app.sendMessage(It.IsAny(), It.IsAny(), It.IsAny()))
        .throws(new Error(errorText));

      const useCase = new SendSpaceliftEventsToSlackUseCase(slackMock.object());
      const payload: SendSpaceliftEventsToSlackDTO = {
        spaceliftSignature: "",
        slackChannel: "fakeChannel",
        webEvent: { ...fixture },
      };

      const result = await useCase.execute(payload);

      expect(result.value.isFailure).toBeTruthy();
      expect(result.value.getErrorValue().message).toBe(
        `An error occurred when calling the Slack API: ${errorText}.`
      );
    });
  });
});
