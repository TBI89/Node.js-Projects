import mongoose, { Document, ObjectId, Schema, model } from "mongoose";
import { CategoryModel } from "./category-model";

// 1. Interface - describing model properties:
export interface IProductModel extends Document {
    // We do not define the _id
    name: string;
    price: number;
    stock: number;
    categoryId: ObjectId; // Primary/Foreign key types to categories.
}

// 2. Schema - describing model rules:
export const ProductSchema = new Schema<IProductModel>({
    name: {
        type: String,
        required: [true, "Missing name."],
        minlength: [2, "Name must be minium 2 charts."],
        maxlength: [100, "Name can't exceed 100 chars."],
        trim: true,
        unique: true
    },
    price: {
        type: Number,
        required: [true, "Missing price"],
        min: [0, "Price can't be negative"],
        max: [1000, "Price can't exceed 1000"]
    },
    stock: {
        type: Number,
        required: [true, "Missing price"],
        min: [0, "Stock can't be negative"],
        max: [1000, "Price can't exceed 1000"]
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId
    }
}, {
    versionKey: false, // Don't add  a __v property to a new document.
    toJSON: { virtuals: true }, // Return virtual fields.
    id: false // Don't duplicate the _id.
});

ProductSchema.virtual("category", {
    ref: CategoryModel,  // The model we are connecting to.  
    localField: "categoryId", //  In our model (ProductModel) which is the related property 
    foreignField: "_id", // In the other model(CategoryModel) which is the related property.
    justOne: true // category field us an object and not array.
});

// 3. Model:
//                                               Model name     Model schema    Collection name
export const ProductModel = model<IProductModel>("ProductModel", ProductSchema, "products");