import { DataTypes } from "sequelize";
import { sequelize } from "../services/sequelize";

export enum Department { HR='HR', PS='PS'};

export interface EmployeeI {
    id: number;
    name: string;
    salary: number;
    department: Department;
}

const { Model } = require("sequelize");

export class Employee extends Model {

  toJSON() {
    return { ...this.get(), uuid: undefined, createdAt: undefined, updatedAt: undefined}
  }
}
Employee.init(
{
  uuid: {
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4,
  },
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salary: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  department: {
    type: DataTypes.ENUM("HR", "PS"),
    allowNull: false
  },
},
{
  sequelize: sequelize(),
  modelName: "Employee",
  tableName: "employees",
}
);