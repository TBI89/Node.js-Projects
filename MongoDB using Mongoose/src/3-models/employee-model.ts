import { Document, Schema, model } from "mongoose";
import { ValidationError } from "./error-models";

// 1. Interface:
export interface IEmployeeModel extends Document {
    firstName: string;
    lastName: string;
    title: string;
    birthDate: string;
    country: string;
    city: string;
    address: string;
}

// 2. Schema:
export const EmployeeSchema = new Schema<IEmployeeModel>({
    firstName: {
        type: String,
        required: [true, "Missing first name."],
        minlength: [2, "First name needs to contain at least 2 chars."],
        maxlength: [20, "First name can't contain more then 20 chars."],
        trim: true, // Ignores extra spaces between the first and last char.
        unique: false // 2 employees can have the same first name...
    },
    lastName: {
        type: String,
        required: [true, "Missing last name."],
        minlength: [2, "Last name needs to contain at least 2 chars."],
        maxlength: [30, "Last name can't contain more then 30 chars."],
        trim: true, // Ignores extra spaces between the first and last char.
        unique: false // 2 employees can have the same last name...
    },
    title: {
        type: String,
        required: [true, "Missing title."],
        minlength: [4, "Title needs to contain at least 4 chars."],
        maxlength: [25, "Title can't contain more then 25 chars."],
        trim: true, // Ignores extra spaces between the first and last char.
        unique: false // 2 employees can have the same title...
    },
    birthDate: { // * Optional - add custom validation.
        type: String,
        minlength: [10, "Birth date needs to contain exactly 8 chars (dd-mm-yyyy format)."],
        maxlength: [10, "Birth date needs to contain exactly 8 chars (dd-mm-yyyy format)."],
        trim: true, // Ignores extra spaces between the first and last char.
        unique: false // 2 employees can have the same birth date...
    },
    country: {
        type: String,
        required: [true, "Missing country."],
        minlength: [3, "Country needs to contain at least 3 chars."],
        maxlength: [30, "Country can't contain more then 30 chars."],
        trim: true, // Ignores extra spaces between the first and last char.
        unique: false // 2 employees can live in the same country...
    },
    city: {
        type: String,
        required: [true, "Missing city."],
        minlength: [3, "Title needs to contain at least 3 chars."],
        maxlength: [30, "Title can't contain more then 30 chars."],
        trim: true, // Ignores extra spaces between the first and last char.
        unique: false // 2 employees can live in the same city...
    },
    address: {
        type: String,
        required: [true, "Missing address."],
        minlength: [5, "Title needs to contain at least 5 chars."],
        maxlength: [50, "Title can't contain more then 50 chars."],
        trim: true, // Ignores extra spaces between the first and last char.
        unique: true // 2 employees can't have exactly the same full address...
    },

}, { versionKey: false }); // Don't display the __v when displaying employees.

// 3. Model:                                            Interface         Schema     Document
export const EmployeeModel = model<IEmployeeModel>("IEmployeeModel", EmployeeSchema, "employees");