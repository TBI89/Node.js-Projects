import express, { Request, Response, NextFunction } from "express";
import employeesService from "../5-services/employees-service";
import StatusCode from "../3-models/status-code";
import EmployeeModel from "../3-models/employee-model";
import verifyToken from "../4-middleware/verify-token";
import verifyAdmin from "../4-middleware/verify-admin";
import path from "path";

// Create router:
const router = express.Router();

// Get all employees:
router.get("/employees", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const employees = await employeesService.getAllEmployees();
        response.json(employees);
    }
    catch (err: any) {
        next(err);
    }
});

// Get one employee:
router.get("/employees/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const employee = await employeesService.getOneEmployee(id);
        response.json(employee);
    }
    catch (err: any) {
        next(err);
    }
});

// Add new employee:
router.post("/employees", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image; // Add image from request.files to request.body.
        const employee = new EmployeeModel(request.body);
        const addedEmployee = await employeesService.addEmployee(employee);
        response.status(StatusCode.Create).json(addedEmployee);
    }
    catch (err: any) {
        next(err);
    }
});

// Update full employee:
router.put("/employees/:id([0-9]+)", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.id = +request.params.id;
        const employee = new EmployeeModel(request.body);
        const updatedEmployee = await employeesService.updateEmployee(employee);
        response.json(updatedEmployee);
    }
    catch (err: any) {
        next(err);
    }
});

// Delete one employee:
router.delete("/employees/:id([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await employeesService.deleteEmployee(id);
        response.status(StatusCode.NoConcent);
    }
    catch (err: any) {
        next(err);
    }
});

// Get one image:
router.get("/employees/:photoPath", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const photoPath = request.params.photoPath;
        const absolutePath = path.join(__dirname, "..", "1-assets", "images", photoPath);
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;  