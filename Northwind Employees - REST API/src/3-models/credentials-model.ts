import Joi from "joi";
import { ValidationError } from "./error-model";

class CredentialModel {

    // Credentials:
    username: string;
    password: string;

    // Copy constructor:
    public constructor(credentials: CredentialModel) {
        this.username = credentials.username;
        this.password = credentials.password;
    }

    // Validation schema:
    private static validationSchema = Joi.object({
        username: Joi.string().required().min(4).max(20),
        password: Joi.string().required().min(6).max(30)
    });

    // Validate properties:
    public validate(): void {
        const result = CredentialModel.validationSchema.validate(this);
        if(result.error?.message) throw new ValidationError(result.error.message);
    }
}

export default CredentialModel;