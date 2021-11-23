import { compareHMACSHA1Signature, createHMACSHA1Signature } from "./crypto";

const secret = "ThisIsMySecretKey";
const message = "This is my plaintext message";
const calculatedSignature = "00e04f75727b3789014d5e7b90309341aaf425dd"; // https://www.freeformatter.com/hmac-generator.html

describe("crypto lib", () => {
  describe("createHMACSignature", () => {
    describe("green path", () => {
      it("generates a valid hmac-sha1 signature", () => {
        const signature = createHMACSHA1Signature(secret, message);
        expect(signature).toBe(calculatedSignature);
      });
    });
  });

  describe("compareHMACSignature", () => {
    describe("green path", () => {
      it("returns true", () => {
        const result = compareHMACSHA1Signature(
          secret,
          message,
          calculatedSignature
        );

        expect(result).toBe(true);
      });
    });

    describe("red path", () => {
      it("returns false with different key", () => {
        const secret = "ThisIsMySecretKeyAltered";
        const message = "This is my plaintext message";

        const result = compareHMACSHA1Signature(
          secret,
          message,
          calculatedSignature
        );

        expect(result).toBe(false);
      });
      it("returns false with different message", () => {
        const secret = "ThisIsMySecretKey";
        const message = "This is my plaintext message altered";

        const result = compareHMACSHA1Signature(
          secret,
          message,
          calculatedSignature
        );

        expect(result).toBe(false);
      });
    });
  });
});
