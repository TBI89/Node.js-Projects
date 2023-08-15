import { RecurseNotFoundError, RouteNotFoundError, ValidationError } from "../3-models/error-models";
import { IProductModel, ProductModel } from "../3-models/product-model";

// For declaring a type in a function we use the interface (like IProductModel)
// For performing the actual command - we use the model (like ProductModel)

// Get all products: 
async function getAllProducts(): Promise<IProductModel[]> {

    // // Get all products without virtual fields:
    // return ProductModel.find().exec();

    // Get all products with virtual fields:
    return ProductModel.find().populate("category").exec();
}

// Get one product: 
async function getOneProduct(_id: string): Promise<IProductModel> {
    const product = await ProductModel.findById(_id).populate("category").exec();
    if (!product) throw new RouteNotFoundError(_id);
    return product;
}

// Add product: 
async function addProduct(product: IProductModel): Promise<IProductModel> {
    const errors = product.validateSync();
    if (errors) throw new ValidationError(errors.message);
    return product.save();
}

// Update product: 
async function updateProduct(product: IProductModel): Promise<IProductModel> {
    const errors = product.validateSync();
    if (errors) throw new ValidationError(errors.message);
    const updatedProduct = await ProductModel.findByIdAndUpdate(product._id, product, { returnOriginal: false }).exec();
    if (!updatedProduct) throw new RouteNotFoundError(product._id);
    return updatedProduct;
}

// Delete product: 
async function deleteProduct(_id: string): Promise<void> {
    const deletedProduct = await ProductModel.findByIdAndDelete(_id).exec();
    if (!deletedProduct) throw new RecurseNotFoundError(_id); // Fix compilation error
}

// Mongo Query Language:
async function getSomeProducts(): Promise<IProductModel[]> {

    // SELECT * FROM products
    // return ProductModel.find().exec();

    // SELECT _id, name, price FROM products
    // return ProductModel.find(null, ["name", "price"]).exec();

    // SELECT _id, name, price FROM products
    // return ProductModel.find(null, { _id: false, name: true, price: true }).exec();

    // // SELECT * FROM product WHERE price = 10
    // return ProductModel.find({price: 10}).exec();

    // // SELECT * FROM product WHERE price >= 10
    // return ProductModel.find({ price: { $gte: 10 } }).exec();

    // // SELECT _id, name, price FROM products WHERE price >= 10 AND price <= 20
    // return ProductModel.find({ price: { $gte: 10, $lte: 20 } }, ["name", "price"]).exec();

    // // SELECT * FROM products WHERE price === 10 OR price === 20
    // return ProductModel.find({ $or: [{ price: 10 }, { price: 20 }] }).exec();

    // // SELECT * FROM products ORDER BY price ASC
    // return ProductModel.find(null, null, { sort: { price: 1 } }).exec();

    // // SELECT * FROM products ORDER BY price DESC
    // return ProductModel.find(null, null, { sort: { price: -1 } }).exec();

    // SELECT * FROM products ORDER BY price ASC, name DESC
    // return ProductModel.find(null, null, { sort: { price: 1, name: -1 } }).exec();

    // // SELECT * FROM products LIMIT 10 OFFSET 20
    // return ProductModel.find(null, null, {skip: 20, limit: 10}).exec();

    // // SELECT * FROM products WHERE  name LIKE 'Ch%' - Contains
    // return ProductModel.find({name: {$regex: "Ch"}}, null).exec();

    // // SELECT * FROM products WHERE  name LIKE 'Ch%' - Starts with
    // return ProductModel.find({ name: { $regex: "^Ch" } }, null).exec();

    // SELECT name, price, stock FROM products WHERE stock > 0 AND price IN (10, 20, 30) ORDER BY price DESC, stock ASC
    return ProductModel.find(
        { stock: { $gt: 0 }, $or: [{ price: 10 }, { price: 20 }, { price: 30 }] },
        { _id: false, name: true, price: true }, { sort: { price: -1, stock: 1 } }).exec();

}

export default {
    getAllProducts,
    getOneProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    getSomeProducts
};
