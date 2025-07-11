import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  user: any;
}

const validateToken = asyncHandler(async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let token: string | undefined;

  const authHeader = (request.headers.Authorization || request.headers.authorization) as string | undefined;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (error, decoded) => {
      if (error) {
        response.status(401);
        throw new Error("User is not authorized");
      }
      request.user = (decoded as JwtPayload).user;
      next();
    });

    if (!token) {
      response.status(401);
      throw new Error("User token error");
    }
  }
});

module.exports = validateToken;
