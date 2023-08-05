import express, { Request, Response, NextFunction } from "express";
import UserModel from "../3-models/user-model";
import authService from "../5-services/auth-service";
import StatusCode from "../3-models/status-code";
import CredentialModel from "../3-models/credentials-model";

const router = express.Router();

// Register:
// http://localhost:4000/api/register
router.post("/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body); // Get user.
        const token = await authService.register(user); // Add to db.
        response.status(StatusCode.Create).json(token); // Response the token.
    }
    catch (err: any) {
        next(err);
    }
});

// Login:
// http://localhost:4000/api/login
router.post("/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new CredentialModel(request.body); // Get credentials.
        const token = await authService.login(credentials); // Login
        response.json(token); // Response token.
    }
    catch (err: any) {
        next(err);
    }
});

export default router;