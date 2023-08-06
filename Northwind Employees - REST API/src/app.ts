import express from "express";
import employeesControllers from "./6-controllers/employees-controller";
import appConfig from "./2-utils/app-config";
import catchAll from "./4-middleware/catch-all";
import routeNotFound from "./4-middleware/route-not-found";
import userControllers from "./6-controllers/auth-controllers";
import expressFileUpload from "express-fileupload";

// Create server:
const server = express();

// Support request.body as JSON:
server.use(express.json());

// Support file upload:
server.use(expressFileUpload());

// Route requests to our controllers:
server.use("/api", employeesControllers);
server.use("/api", userControllers);

// Connect route not found middleware:
server.use("*", routeNotFound);

// Connect catch-all middleware:
server.use(catchAll);

// Upload server:
server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));