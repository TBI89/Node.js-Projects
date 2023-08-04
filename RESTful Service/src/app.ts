import express, { Request, Response } from "express";

// Creating server:
const server = express();

// Creating body object for requests:
server.use(express.json());

// Display all products:
server.get("/tech-world/api/products", (request: Request, response: Response) => {
    response.json(products);
});

// Display a single product:
server.get("/tech-world/api/products/:id", (request: Request, response: Response) => {
    const id = +request.params.id;
    const product = products.find(p => p.id === id);
    response.json(product);
});

// Create a new product:
server.post("/tech-world/api/products", (request: Request, response: Response) => {
    const product = request.body;
    product.id = products[products.length - 1].id + 1; // Generate new id.
    products.push(product);
    response.json(product);
});

// Update full product:
server.put("/tech-world/api/products/:id", (request: Request, response: Response) => {
    request.body.id = +request.params.id;
    const product = request.body;
    const index = products.findIndex(p => p.id === product.id);
    products[index] = product;
    response.json(product);
});

// Update a partial product:
server.patch("/tech-world/api/products/:id", (request: Request, response: Response) => {
    request.body.id = +request.params.id;
    const partialProduct = request.body;
    const dbProduct = products.find(p => p.id === partialProduct.id);
    for (const prop in partialProduct) {
        dbProduct[prop] = partialProduct[prop];
    }
    response.json(dbProduct);
});

// Delete one full product:
server.delete("/tech-world/api/products/:id", (request: Request, response: Response) => {
   const id = +request.params.id;
   const index = products.findIndex(p => p.id === id);
   products.splice(index, 1);
   response.send();
});

// Upload server to the air:
server.listen(5000, () => console.log("Listing on https://localhost:5000"));

// Create the backend data:
const products = [
    { id: 1, type: "Gaming Consoles", name: "XBOX", price: 1349 },
    { id: 2, type: "Smartphones", name: "Iphone 14 Pro Max", price: 7549 },
    { id: 3, type: "Laptops", name: "Vivobook 15", price: 2679 },
    { id: 4, type: "Smartwatches", name: "Epics Pro", price: 4549 },
    { id: 5, type: "Webcams", name: "BP-6600", price: 399 },
    { id: 6, type: "Printers", name: "HLL231", price: 599 },
    { id: 7, type: "Scanners", name: "WorkForce DS", price: 3799 },
    { id: 8, type: "Gaming Headphones", name: "Actis Nova 3", price: 1349 },
    { id: 9, type: "TV's", name: "Samsung 4k QLED", price: 10990 },
    { id: 10, type: "Vacuum Cleaner", name: "Shark Plus Pro", price: 1989 }
];
