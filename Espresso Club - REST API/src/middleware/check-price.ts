import { Request, Response, NextFunction } from "express";

function checkPrice(request: Request, response: Response, next: NextFunction): void {
    const productPrice = request.body.price;
    if (productPrice === 0) {
        console.log("Weeeee free coffee!!!");
        next();
    }
    next();
}

export default checkPrice;