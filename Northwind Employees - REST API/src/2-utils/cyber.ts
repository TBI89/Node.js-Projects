import Jwt from "jsonwebtoken";
import { ForbiddenError, UnauthorizedError } from "../3-models/error-model";
import RoleModel from "../3-models/role-model";
import UserModel from "../3-models/user-model";

// Create secret key:
const tokenSecretKey = "Northwind-Cool-Employees!!!";

// Create JWT token:
function getNewToken(user: UserModel): string {

    const container = { user };
    const options = { expiresIn: "8h" };
    const token = Jwt.sign(container, tokenSecretKey, options);
    return token;
}

// Check validity:
function verifyToken(token: string): void {

    if (!token) throw new UnauthorizedError("You are not authorized!");

    try {
        Jwt.verify(token, tokenSecretKey);
    }
    catch (err: any) {
        throw new UnauthorizedError(err.message);
    }
}

// Verify admin role:
function verifyAdmin(token: string): void {

    verifyToken(token);
    const container = Jwt.verify(token, tokenSecretKey) as {user: UserModel};
    const user = container.user;
    
    if(user.roleId !== RoleModel.Admin) throw new ForbiddenError("You are not an admin!");
}

export default {
    getNewToken,
    verifyToken,
    verifyAdmin
};