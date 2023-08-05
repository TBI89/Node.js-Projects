import { OkPacket } from "mysql";
import cyber from "../2-utils/cyber";
import dal from "../2-utils/dal";
import UserModel from "../3-models/user-model";
import CredentialModel from "../3-models/credentials-model";
import { UnauthorizedError, ValidationError } from "../3-models/error-model";

// Register a new user:
async function register(user: UserModel): Promise<string> { // returns a JWT token.

    // Validate props:
    user.validate();

    // Check username availability:
    if(await isUsernameTaken(user.username)) throw new ValidationError(`Username ${user.username} is already taken.`);

    // SQL query:
    const sql = `INSERT INTO users(firstName, lastName, username, password, roleId) 
    VALUES('${user.firstName}','${user.lastName}','${user.username}','${user.password}',${user.roleId} )`;

    // Execute:
    const info: OkPacket = await dal.execute(sql);

    // Set new id:
    user.id = info.insertId;

    // Get token:
    const token = cyber.getNewToken(user);
    return token;
}

// Login:
async function login(credentials: CredentialModel): Promise<string> {

    // Validate:
    credentials.validate();

    // SQL:
    const sql = `SELECT * FROM users WHERE 
    username = '${credentials.username}' AND password = '${credentials.password}'`;

    // Execute:
    const users = await dal.execute(sql);

    // Extract user:
    const user = users[0];

    // Check existence:
    if (!user) throw new UnauthorizedError("Wrong username and/or password");

    // Generate & JWT token:
    const token = cyber.getNewToken(user);
    return token;
}

// Check if the username is already taken:
async function isUsernameTaken(username: string): Promise<boolean> {
    const sql = `SELECT COUNT(*) AS count FROM users WHERE username = '${username}'`; // = Exist.
    const result = await dal.execute(sql);
    const count = result[0].count;
    return count > 0;
}

export default {
    register,
    login
};