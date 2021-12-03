import { Response } from "express";

const jsonResponse = (res: Response, code: number, message: string) =>
  res.status(code).json({ message });

function ok<T>(res: Response, dto?: T) {
  // eslint-disable-next-line no-extra-boolean-cast
  if (!!dto) {
    res.type("application/json");
    return res.status(200).json(dto);
  } else {
    return res.sendStatus(200);
  }
}

const created = (res: Response) => res.sendStatus(201);

const clientError = (res: Response, message?: string) =>
  jsonResponse(res, 400, message ? message : "Unauthorized");

const unauthorized = (res: Response, message?: string) =>
  jsonResponse(res, 401, message ? message : "Unauthorized");

const paymentRequired = (res: Response, message?: string) =>
  jsonResponse(res, 402, message ? message : "Payment required");

const forbidden = (res: Response, message?: string) =>
  jsonResponse(res, 403, message ? message : "Forbidden");

const notFound = (res: Response, message?: string) =>
  jsonResponse(res, 404, message ? message : "Not found");

const conflict = (res: Response, message?: string) =>
  jsonResponse(res, 409, message ? message : "Conflict");

const tooMany = (res: Response, message?: string) =>
  jsonResponse(res, 429, message ? message : "Too many requests");

const fail = (res: Response, error: Error | string) => {
  return res.status(500).json({
    message: error.toString(),
  });
};

const expressHelpers = {
  clientError,
  conflict,
  created,
  forbidden,
  fail,
  jsonResponse,
  notFound,
  ok,
  paymentRequired,
  tooMany,
  unauthorized,
};

export { expressHelpers };
