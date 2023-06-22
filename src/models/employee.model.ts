export enum Department { HR='HR', PS='PS' };

export interface Employee {
    id: number;
    name: string;
    salary: number;
    department: Department;
}

