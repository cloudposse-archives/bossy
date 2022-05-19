import { Guard, GuardResponse } from "./guard";
import { Result } from "./result";

describe("guard", () => {
  let result: Result<GuardResponse>;
  const argName = "testArgument";
  const secondArgName = "secondaryTestArgument";

  beforeEach(() => {
    result = null;
  });

  describe("againstNullOrUndefined", () => {
    it("succeeds with true", () => {
      result = Guard.againstNullOrUndefined(true, argName);
      expect(result.isSuccess).toBeTruthy();
    });

    it("fails with null", () => {
      result = Guard.againstNullOrUndefined(null, argName);
      expect(result.isSuccess).toBeFalsy();
      expect(result.getErrorValue()).toEqual(`${argName} is null or undefined`);
    });

    it("fails with undefined", () => {
      result = Guard.againstNullOrUndefined(undefined, argName);
      expect(result.isSuccess).toBeFalsy();
      expect(result.getErrorValue()).toEqual(`${argName} is null or undefined`);
    });

    it("succeeds with empty string", () => {
      result = Guard.againstNullOrUndefined("", argName);
      expect(result.isSuccess).toBeTruthy();
    });
  });

  describe("againstNullOrUndefinedBulk", () => {
    it("succeeds with valid values", () => {
      result = Guard.againstNullOrUndefinedBulk([
        { argumentName: argName, argument: true },
        { argumentName: secondArgName, argument: 15 },
      ]);
      expect(result.isSuccess).toBeTruthy();
    });

    it("fails with a single null value", () => {
      result = Guard.againstNullOrUndefinedBulk([
        { argumentName: argName, argument: null },
        { argumentName: secondArgName, argument: 8 },
      ]);

      expect(result.isSuccess).toBeFalsy();
      expect(result.getErrorValue()).toEqual(`${argName} is null or undefined`);
    });

    it("fails with a single undefined value", () => {
      result = Guard.againstNullOrUndefinedBulk([
        { argumentName: argName, argument: undefined },
        { argumentName: secondArgName, argument: 98 },
      ]);

      expect(result.isSuccess).toBeFalsy();
      expect(result.getErrorValue()).toEqual(`${argName} is null or undefined`);
    });
  });
});
