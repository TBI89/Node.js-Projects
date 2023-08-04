import { Request, Response, NextFunction } from "express";

function verbose(request: Request, response: Response, next: NextFunction): void {
    const id = +request.params.id; // Take product id.
    console.log(`User trying to update id: ${id}`); // Print the msg + prod.id on the console.
    next(); // Let the server to response.
}

export default verbose;