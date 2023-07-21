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

        let emp; 
        let deptMap = new Map<Number, string>();
        deptMap.set(1, "HR")
        deptMap.set(2, "PS");

        console.log('hash map', deptMap)

        if (deptMap.has(+deptid)) {
            const department = deptMap.get(+deptid)
            emp = await Employee.findAll({ where: { department }});
        }
        else { // admin
            emp = await Employee.findAll();
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
            let emp: EmployeeI = { name: '', salary: 0, department: Department.HR}
            const empobj = await Employee.findAll()

            try {
                const existEmp = empobj.some((emp: EmployeeI) => emp.name === name);
                
                if (!existEmp) {
                    emp = await Employee.create({ name, salary, department });
                    return resolve(emp)
                } else {
                    return resolve(emp)
                }
            } catch (e) {
                return reject(e);   
            }
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
  
