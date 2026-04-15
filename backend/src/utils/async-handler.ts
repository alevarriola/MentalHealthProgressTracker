import type { NextFunction, Request, RequestHandler, Response } from "express";

export function asyncHandler(handler: RequestHandler): RequestHandler {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      await handler(request, response, next);
    } catch (error) {
      next(error);
    }
  };
}
