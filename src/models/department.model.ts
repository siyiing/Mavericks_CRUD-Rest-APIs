import { Model, DataTypes } from 'sequelize';
import { sequelize } from "../services/sequelize";

export interface DepartmentAttributes {
  id: number;
  name: string;
}

 export default class Department extends Model<DepartmentAttributes> implements DepartmentAttributes {

    id!: number;
    name!: string;

    static associate( models: any ) {
      Department.hasMany(models.users, {foreignKey: 'userId'})
    }
  }
  Department.init(
    {
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
    },
    {
      sequelize: sequelize(),
      modelName: "Department",
      tableName: "departments",
    }
  );


