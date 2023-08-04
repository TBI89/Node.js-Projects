import StatusCode from "./status-code";

// Super class:
abstract class ClientErrors {
    constructor(public status: number, public message: string) { }
}

// Inherited classes:
// 400:
export class ValidationError extends ClientErrors {
    constructor(message: string) {
        super(StatusCode.BadRequest, message);
    }
}

// 401:
export class UnauthorizedError extends ClientErrors {
    constructor(message: string) {
        super(StatusCode.Unauthorized, message);
    }
}

// 403:
export class ForbiddenError extends ClientErrors {
    constructor(message: string) {
        super(StatusCode.Forbidden, message);
    }
}

// * 404 - Resource not found:
export class ResourceNotFoundError extends ClientErrors {
    constructor(id: number) {
        super(StatusCode.NotFound, `ID ${id} not found.`);
    }
}

// * 404 - Route not found:
export class RouteNotFoundError extends ClientErrors {
    constructor(route: string) {
        super(StatusCode.NotFound, `Route ${route} doesn't exist.`);
    }
}