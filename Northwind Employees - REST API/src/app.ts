import express from "express";
import EmployeesControllers from "./6-controllers/employees-controller";
import appConfig from "./2-utils/app-config";
import catchAll from "./4-middleware/catch-all";
import routeNotFound from "./4-middleware/route-not-found";
import UserControllers from "./6-controllers/auth-controllers";

// Create server:
const server = express();

// Support request.body as JSON:
server.use(express.json());

// Route requests to our controllers:
server.use("/api", EmployeesControllers);
server.use("/api", UserControllers);

// Connect route not found middleware:
server.use("*", routeNotFound);

// Connect catch-all middleware:
server.use(catchAll);

// Upload server:
server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));