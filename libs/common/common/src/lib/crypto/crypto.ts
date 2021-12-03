import { createHmac } from "crypto";

const createHMACSHA1Signature = (secret: string, data: string): string => {
  return createHmac("sha1", secret).update(data).digest("hex");
};

const compareHMACSHA1Signature = (
  secret: string,
  data: string,
  signature: string
): boolean => {
  return createHMACSHA1Signature(secret, data) === signature;
};

export { createHMACSHA1Signature, compareHMACSHA1Signature };
