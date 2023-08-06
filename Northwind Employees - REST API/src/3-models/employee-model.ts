import Joi from "joi";
import { ValidationError } from "./error-model";

class EmployeeModel {

    // Employee model:
    public id: number;
    public firstName: string;
    public lastName: string;
    public birthDate: string;
    public country: string;
    public city: string;
    public imageUrl: string;

    // Copy constructor:
    public constructor(employee: EmployeeModel) {
        this.id = employee.id;
        this.firstName = employee.firstName;
        this.lastName = employee.lastName;
        this.birthDate = employee.birthDate;
        this.country = employee.country;
        this.city = employee.city;
        this.imageUrl = employee.imageUrl;
    }

    // Validate properties (throw if not valid):
    private static validationSchema = Joi.object({
        id: Joi.number().optional().integer().positive(),
        firstName: Joi.string().required().min(2).max(15),
        lastName: Joi.string().required().min(2).max(20),
        birthDate: Joi.date().required(),
        country: Joi.string().required().min(3).max(20),
        city: Joi.string().required().min(2).max(30),
        imageUrl: Joi.string().optional().min(36).max(200)
    });

    // Validate properties:
    public validate(): void {
        const result = EmployeeModel.validationSchema.validate(this);
        if(result.error?.message) throw new ValidationError(result.error.message);
    }
}

export default EmployeeModel;