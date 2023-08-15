// For declaring a type in a function we use the interface (like IEmployeeModel)
// For performing the actual command - we use the model (like EmployeeModel)

import { EmployeeModel, IEmployeeModel } from "../3-models/employee-model";
import { RecurseNotFoundError, ValidationError } from "../3-models/error-models";

// Get all employees:
async function getAllEmployees(): Promise<IEmployeeModel[]> {
    return EmployeeModel.find().exec(); // Find, execute and return an array.
}

// Get one employee:
async function getOneEmployee(_id: string): Promise<IEmployeeModel> {
    const employee = await EmployeeModel.findById(_id).exec(); // Declare an employee.
    if (!employee) throw new RecurseNotFoundError(employee._id); // Check if exist (if not throw 404).
    return employee;
}

// Add new employee:
async function addEmployee(employee: IEmployeeModel): Promise<IEmployeeModel> {
    const errors = employee.validateSync(); // Validate props.
    if (errors) throw new ValidationError(errors.message); // If validation failed - display the errors.
    return employee.save(); // If validation passed - add & save the new employee.
}

// Update one employee:
async function updateOneEmployee(employee: IEmployeeModel): Promise<IEmployeeModel> {
    const errors = employee.validateSync();
    if (errors) throw new ValidationError(errors.message);
    // Update employee data using _id and return the updated document:
    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(employee._id, employee, { returnOriginal: false }).exec();
    if (!updatedEmployee) throw new RecurseNotFoundError(employee._id);
    return updatedEmployee;
}

// Delete one employee:
async function deleteOneEmployee(_id: string): Promise<void> {
    const deletedEmployee = await EmployeeModel.findByIdAndDelete(_id).exec(); // Declare an employee.
    if (!deletedEmployee) throw new RecurseNotFoundError(deletedEmployee._id); // Check if exist (if not throw 404).
}

export default {
    getAllEmployees,
    getOneEmployee,
    addEmployee,
    updateOneEmployee,
    deleteOneEmployee
};