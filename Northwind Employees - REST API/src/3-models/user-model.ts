import Joi from "joi";
import { ValidationError } from "./error-model";
import RoleModel from "./role-model";

class UserModel {

    // Model properties:
    public id: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public roleId: RoleModel;

    // Copy constructor:
    public constructor(user: UserModel) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.roleId = user.roleId;
    }

    // Validation schema (build once):
    private static validationSchema = Joi.object({
        id: Joi.number().optional().integer().positive(),
        firstName: Joi.string().required().min(2).max(15),
        lastName: Joi.string().required().min(2).max(25),
        username: Joi.string().required().min(4).max(30),
        password: Joi.string().required().min(6).max(40),
        roleId: Joi.number().optional().min(1).max(2).integer()
    });

    // Validate props:
    public validate(): void {
        const result = UserModel.validationSchema.validate(this);
        if(result.error?.message) throw new ValidationError(result.error.message);
    }

}

export default UserModel;