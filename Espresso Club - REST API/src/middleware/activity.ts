import { NextFunction, Request, Response } from "express";
import fsPromises from "fs/promises";

// Maintain an activity log (on the app level) on every request:
async function activity(request: Request, response: Response, next: NextFunction): Promise<void> {
    try { // Display the date, time, route and user IP address on a txt file:
        const now = new Date();
        const currentDate = now.toLocaleDateString();
        const currentTime = now.toLocaleTimeString();
        const userIp = request.ip; // Take IP
        await fsPromises.writeFile("./activities.txt", `Date: ${currentDate} , Time: ${currentTime}
        \n Method: ${request.method} \n Route: ${request.originalUrl} \n User IP: ${userIp}`);
        const content = await fsPromises.readFile("./activities.txt", "utf-8");
        console.log(content);
        next();
    }
    catch (err: any) {
        next(err);
    }
}

export default activity;