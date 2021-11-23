import { compareHMACSHA1Signature, createHMACSHA1Signature } from "./crypto";

describe("crypto lib", () => {
  describe("createHMACSignature", () => {
    describe("green path", () => {
      it("generates a valid hmac-sha1 signature", () => {
        const secret = "ThisIsMySecretKey";
        const message = "This is my plaintext message";
        const signature = createHMACSHA1Signature(secret, message);

        expect(signature).toBe(
          "00e04f75727b3789014d5e7b90309341aaf425dd" // https://www.freeformatter.com/hmac-generator.html
        );
      });
    });
  });

  describe("compareHMACSignature", () => {
    describe("green path", () => {
      it("returns true", () => {
        const secret = "ThisIsMySecretKey";
        const message = "This is my plaintext message";
        const signature = "00e04f75727b3789014d5e7b90309341aaf425dd";

        const result = compareHMACSHA1Signature(secret, message, signature);

        expect(result).toBe(true);
      });
    });

    describe("red path", () => {
      it("returns false with different key", () => {
        const secret = "ThisIsMySecretKeyAltered";
        const message = "This is my plaintext message";
        const signature = "00e04f75727b3789014d5e7b90309341aaf425dd";

        const result = compareHMACSHA1Signature(secret, message, signature);

        expect(result).toBe(false);
      });
      it("returns false with different message", () => {
        const secret = "ThisIsMySecretKey";
        const message = "This is my plaintext message altered";
        const signature = "00e04f75727b3789014d5e7b90309341aaf425dd";

        const result = compareHMACSHA1Signature(secret, message, signature);

        expect(result).toBe(false);
      });
    });
  });
});
