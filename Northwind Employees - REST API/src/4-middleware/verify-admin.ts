import { Request, Response, NextFunction } from "express";
import cyber from "../2-utils/cyber";

function verifyAdmin(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.header("authorization");
    const token = authHeader?.substring(7);
    cyber.verifyAdmin(token);
    next();
}

export default verifyAdmin;