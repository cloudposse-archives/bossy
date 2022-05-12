import LambdaTester from "lambda-tester";

import spaceliftEvent from "./fixtures/SpaceliftWebhookEvent.json";
import { handler } from "./lambda";

describe("lambdas", () => {
  describe("/test", () => {
    it("returns body", async () => {
      const result = await LambdaTester(handler)
        .event({
          body: null,
          httpMethod: "GET",
          path: "/test",
          requestContext: {},
        })
        .expectResult();
      expect(result.body).toBe("Hello World!");
    });
  });

  describe("/webhooks/spacelift", () => {
    it("returns", async () => {
      const result = await LambdaTester(handler)
        .event({
          headers: {
            Accept: "application/json",
          },
          multiValueHeaders: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(spaceliftEvent),
          httpMethod: "POST",
          path: "/webhooks/spacelift",
          requestContext: {},
        })
        .expectResult();
      expect(result.body).toBe("OK");
      expect(result.statusCode).toBe(200);
    });
  });
});
