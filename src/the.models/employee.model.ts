export enum Department { HR='HR', PS='PS' };

export interface EmployeeI {
    id: number;
    name: string;
    salary: number;
    department: Department;
}

