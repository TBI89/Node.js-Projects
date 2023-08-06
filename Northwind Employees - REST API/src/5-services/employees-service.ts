import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import EmployeeModel from "../3-models/employee-model";
import { ResourceNotFoundError } from "../3-models/error-model";
import appConfig from "../2-utils/app-config";
import imageHandler from "../2-utils/image-handler";


// Get all employees:
async function getAllEmployees(): Promise<EmployeeModel[]> {

    const sql = `SELECT
     EmployeeID AS id,
    FirstName AS firstName,
    LastName AS lastName,
    BirthDate AS birthDate,
    Country AS country,
    City AS city,
    CONCAT('${appConfig.domainName}/api/employees/', photoPath) as imageUrl
    FROM employees`;
    const employees = await dal.execute(sql);
    return employees;
}

// Get one employee:
async function getOneEmployee(id: number): Promise<EmployeeModel> {

    const sql = `
 SELECT EmployeeID AS id,
 FirstName AS firstName,
 LastName AS lastName,
 BirthDate AS birthDate,
 Country AS country,
 City AS city
 FROM employees
 WHERE EmployeeID = ${id}`;

    const employees = await dal.execute(sql);
    const employee = employees[0];
    if (!employee) throw new ResourceNotFoundError(id);
    return employee;
}

// Add new employee:
async function addEmployee(employee: EmployeeModel): Promise<EmployeeModel> {

    employee.validate(); // Validate props.

    const imageName = await imageHandler.saveImage(employee.image);

    const sql = `INSERT INTO employees(FirstName, LastName, BirthDate, Country, City, PhotoPath)
    VALUES('${employee.firstName}', '${employee.lastName}', '${employee.birthDate}', '${employee.country}', '${employee.city}', '${imageName}')`;
    const info: OkPacket = await dal.execute(sql);
    employee.id = info.insertId;
    employee.imageUrl = `${appConfig.domainName}/api/employees/${imageName}`;
    console.log(imageName);
    return employee;
}

// Update full employee:
async function updateEmployee(employee: EmployeeModel): Promise<EmployeeModel> {

    employee.validate(); // Validate props.

    const sql = `UPDATE employees SET
    FirstName = '${employee.firstName}',
    LastName = '${employee.lastName}',
    BirthDate = '${employee.birthDate}',
    Country = '${employee.country}',
    City = '${employee.city}'
    WHERE EmployeeID = ${employee.id}`;

    const info: OkPacket = await dal.execute(sql);
    if (info.affectedRows === 0) throw new ResourceNotFoundError(employee.id);
    return employee;
}

// Delete employee:
async function deleteEmployee(id: number): Promise<void> {

    const sql = `DELETE FROM employees WHERE EmployeeID = ${id}`;
    const info: OkPacket = await dal.execute(sql);
    if (info.affectedRows === 0) throw new ResourceNotFoundError(id);
}

export default {
    getAllEmployees,
    getOneEmployee,
    addEmployee,
    updateEmployee,
    deleteEmployee
};