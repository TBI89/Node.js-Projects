import { Request, Response, NextFunction } from "express";
import cyber from "../2-utils/cyber";

function verifyToken(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.header("authorization");
    const token = authHeader?.substring(7); // 7 chars = Bearer + 1 space.
    cyber.verifyToken(token);
    next();
}

export default verifyToken;