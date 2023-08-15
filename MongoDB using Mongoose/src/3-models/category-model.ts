import { Document, Schema, model } from "mongoose";

// 1. Interface:
export interface ICategoryModel extends Document {
    name: string;
    description: string;
}

// 2. Schema:
export const CategorySchema = new Schema<ICategoryModel>({
    name: {
        type: String,
        required: [true, "Missing name."],
        minlength: [2, "Name must be minium 2 charts."],
        maxlength: [100, "Name can't exceed 100 chars."],
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, "Missing description."],
        minlength: [10, "Name must be minium 2 charts."],
        maxlength: [1000, "Name can't exceed 100 chars."],
        trim: true
    }
}, {versionKey: false});

// 3. Model:
export const CategoryModel = model<ICategoryModel>("ICategoryModel", CategorySchema, "categories");