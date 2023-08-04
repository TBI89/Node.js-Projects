import express, { Request, Response } from "express";
import verbose from "./middleware/verbose";
import activity from "./middleware/activity";
import checkPrice from "./middleware/check-price";

// Creating REST API server:
const server = express();

// Creating a body obj:
server.use(express.json());

// Connect activity middleware:
server.use(activity);

// Display the whole arr:
server.get("/api/espresso-club/products", (request: Request, response: Response) => {
    response.json(coffee);
});

// * Return weaker intensity from what the user typed on the route:
server.get("/api/espresso-club/products/:intenseLvl", (request: Request, response: Response) => { // Moved to top in order to refer the route to the intenseLvl (instead of the id).
    const prodIntensityLvl = +request.params.intenseLvl; // Init the product "intenseLvl", as what the user types on the route.
    const weakerCoffeeProducts = coffee.filter(p => p.intenseLvl < prodIntensityLvl); // Filter from the "coffee" arr, check if the "intenseLvl" of each item is smaller then the the route (on the user request).
    response.json(weakerCoffeeProducts); // Display the objects with a smaller "intenseLvl" values.
});

// Display one products based on the id:
server.get("/api/espresso-club/products/:id", (request: Request, response: Response) => {
    const id = +request.params.id;
    const product = coffee.find(p => p.id === id);
    response.json(product);
});

// Add a new coffee product:
server.post("/api/espresso-club/products", checkPrice, (request: Request, response: Response) => {
    const product = request.body;
    product.id = coffee[coffee.length - 1].id + 1; // Generate id.
    coffee.push(product);
    response.json(product);
});

// Full update for one product:
server.put("/api/espresso-club/:id", verbose, (request: Request, response: Response) => {
    request.body.id = +request.params.id;
    const product = request.body;
    const index = coffee.findIndex(c => c.id === product.id);
    coffee[index] = product;
    response.json(product);
});

// Update partial product:
server.patch("/api/espresso-club/:id", (request: Request, response: Response) => {
    request.body.id = +request.params.id;
    const partialProduct = request.body;
    const dbProduct = coffee.find(p => p.id === partialProduct.id);
    for (const prop in partialProduct) {
        dbProduct[prop] = partialProduct[prop];
    }
    response.json(dbProduct);
});

// Delete one product:
server.delete("/api/espresso-club/:id", (request: Request, response: Response) => {
    const id = +request.params.id;
    const index = coffee.findIndex(c => c.id === id);
    coffee.splice(index, 1);
    response.send();
});

// Upload sever to the air:
server.listen(5000, () => console.log("Listening"));

// Data:
const coffee = [
    { id: 1, type: "Espresso", price: 6, intenseLvl: 9 },
    { id: 2, type: "Pure origin", price: 10, intenseLvl: 7 },
    { id: 3, type: "Lungo", price: 11, intenseLvl: 11 }
];

