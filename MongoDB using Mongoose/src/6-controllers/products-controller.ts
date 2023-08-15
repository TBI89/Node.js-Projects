import express, { Request, Response, NextFunction } from "express";
import productsService from "../5-services/products-service";
import StatusCode from "../3-models/status-code";
import { ProductModel } from "../3-models/product-model";

// Create the router part of express:
const router = express.Router();

// GET http://localhost:4000/api/products
router.get("/products", async (request: Request, response: Response, next: NextFunction) => {
    try {

        // Get all products from database: 
        const products = await productsService.getAllProducts();

        // Response back all products: 
        response.json(products);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:4000/api/products/:id
router.get("/products/:_id([0-9a-f]{24})", async (request: Request, response: Response, next: NextFunction) => {

    try {
        // Get route id: 
        const _id = request.params._id;

        // Get one product from database: 
        const product = await productsService.getOneProduct(_id);

        // Response back desired product: 
        response.json(product);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:4000/api/products
router.post("/products", async (request: Request, response: Response, next: NextFunction) => {

    try {
        // Get product sent from frontend:
        const product = new ProductModel(request.body);

        // Add product to database:
        const addedProduct = await productsService.addProduct(product);

        // Response back the added product: 
        response.status(StatusCode.Created).json(addedProduct);
    }
    catch (err: any) {
        next(err);
    }
});

// PUT http://localhost:4000/api/products/:_id
router.put("/products/:_id([0-9a-f]{24})", async (request: Request, response: Response, next: NextFunction) => {

    try {
        // Extract route id into body:
        request.body._id = request.params._id;

        // Get product sent from frontend:
        const product = new ProductModel(request.body);

        // Update product in database:
        const updatedProduct = await productsService.updateProduct(product);

        // Response back the updated product: 
        response.json(updatedProduct);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE http://localhost:4000/api/products/:_id
router.delete("/products/:_id([0-9a-f]{24})", async (request: Request, response: Response, next: NextFunction) => {

    try {
        // Get route _id:
        const _id = request.params._id;

        // Delete product from database:
        await productsService.deleteProduct(_id);

        // Response back:
        response.sendStatus(StatusCode.NoContent);
    }
    catch (err: any) {
        next(err);
    }
});

// GET some products:
router.get("/some-products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Get some products from database: 
        const products = await productsService.getSomeProducts();

        // Response back some products: 
        response.json(products);
    }
    catch (err: any) {
        next(err);
    }
});

// Export the above router:
export default router;
