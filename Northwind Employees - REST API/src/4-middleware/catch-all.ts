import { Request, Response, NextFunction } from "express";
import StatusCode from "../3-models/status-code";

// Handle all errors:
function catchAll(err: any, request: Request, response: Response, next: NextFunction): void {
    console.log("Error: ", err); // Log the error object.
    const status = err.status || StatusCode.InterNalServerError; // Take status.
    const message = err.message; // Take message.
    response.status(status).send(message); // Response back the error type
}

export default catchAll;