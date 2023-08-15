import express, { Request, Response, NextFunction } from "express";
import employeesServices from "../5-services/employees-services";
import { EmployeeModel } from "../3-models/employee-model";
import StatusCode from "../3-models/status-code";

// Create router:
const router = express.Router();

// GET - all employees
// http://localhost:4000/api/employees
router.get("/employees", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const employees = await employeesServices.getAllEmployees();
        response.json(employees);
    }
    catch (err: any) {
        next(err);
    }
});

// GET - one employee
// http://localhost:4000/api/employees/:_id
router.get("/employees/:_id([0-9a-f]{24})", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        const employee = await employeesServices.getOneEmployee(_id);
        response.json(employee);
    }
    catch (err: any) {
        next(err);
    }
});

// POST - add new employee
// http://localhost:4000/api/employees
router.post("/employees", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const employee = new EmployeeModel(request.body); // Create new employee (class obj).
        const addedEmployee = await employeesServices.addEmployee(employee); // Add to db.
        response.status(StatusCode.Created).json(addedEmployee); // Response the new employee & send status 201.
    }
    catch (err: any) {
        next(err);
    }
});

// PUT - update employee
// http://localhost:4000/api/employees/:_id
router.put("/employees/:_id([0-9a-f]{24})", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body._id = request.params._id; // Extract route id into body.
        const employee = new EmployeeModel(request.body); // Get the employee from the frontend.
        const updatedEmployee = await employeesServices.updateOneEmployee(employee); // Update the employee on database.
        response.json(updatedEmployee); // Response the updated employee.
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE - remove employee
// http://localhost:4000/api/employees/:_id
router.delete("/employees/:_id([0-9a-f]{24})", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id; // Extract employee _id.
        await employeesServices.deleteOneEmployee(_id); // Delete from database.
        response.sendStatus(StatusCode.NoContent); // Response 204.
    }
    catch (err: any) {
        next(err);
    }
});

export default router;