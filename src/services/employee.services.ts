import { Department, EmployeeI, Employee } from '../models/employee.model';

// RETURN ALL EMPLOYEES
export async function getAllEmployeeService(): Promise<EmployeeI> {
    return new Promise (async (resolve, reject) => {
        try {
            const emp = await Employee.findAll();
            return resolve(emp);
        } catch (e) {
            return reject(e);
        }
    })
}

// RETURN EMPLOYEES BY DEPARTMENT ID
export async function getEmployeessByDepartmentIdService(deptid: string): Promise<EmployeeI> {
    return new Promise(async (resolve, reject) => {
      try {

        let department = "";
        let emp ; 
        if (deptid === '3') {
            emp = await Employee.findAll();
        } else {
             if ( deptid === '1') department = 'HR' 
             else if (deptid === '2') department = 'PS'

             emp = await Employee.findAll({ where: { department} });
        }
        
        return resolve(emp);
      } catch (e) {
        return reject(e);
      }
    });
  }



// CREATE NEW EMPLOYEE 
export async function createEmployeeService(name: string, salary: number, department: Department): Promise<EmployeeI> {
    return new Promise (async (resolve, reject) => {
        try {
            const emp = await Employee.create({ name, salary, department });
            return resolve(emp);
        } catch (e) {
            return reject(e);   
        }
    })
}

// GET EMPLOYEE BY ID
export async function getEmployeeByIdService(id: string): Promise<EmployeeI> {
    return new Promise (async (resolve, reject) => {
        try {
            const emp  = await Employee.findOne({ where: { id }});
            return resolve(emp);
        } catch (e) {
            return reject(e);   
        }
    })
}

// UPDATE EMPLOYEE
export async function updateEmployeeByIdService(curEmp: EmployeeI, inputEmp: EmployeeI): Promise<EmployeeI | number> { 
    return new Promise (async (resolve, reject) => {
        try {
            if (curEmp.name == inputEmp.name && curEmp.salary == inputEmp.salary && curEmp.department == inputEmp.department) {
                    return resolve(304);1
                } 
                else  {
                    const emp = await Employee.update({
                            name: inputEmp.name,
                            salary: inputEmp.salary,
                            department: inputEmp.department,
                        },{
                            where: { id:inputEmp.id },  returning: true,
                        })
                    return resolve(emp);
                }
        } catch (e) {
            return reject(e);   
        }
    })
}
  

// DELETE EMPLOYEE 
export async function deleteEmployeeByIdService(id: string): Promise<number> {
    return new Promise (async (resolve, reject) => {
        try {
            const emp  = await Employee.findOne({ where: { id }});

            if (!emp)  // not exist 
                return resolve(404);

            await emp.destroy();
            return resolve(204);
        } catch (e) {
            return reject(e);   
        }
    })
}
  
