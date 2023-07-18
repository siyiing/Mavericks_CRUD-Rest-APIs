import { Model, DataTypes } from 'sequelize';
import { sequelize } from "../services/sequelize";

export interface UserAttributes {
  id?: number;
  username: string;
  password: string;
  departmentId: number;
}
 export class User extends Model<UserAttributes> implements UserAttributes {

    id!: number;
    username!: string;  
    password!: string;
    departmentId!: number;

    static associate( models: any ) {
      User.belongsTo(models.departments, {foreignKey: 'departmentId'})
    }
  };

  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize: sequelize(),
    modelName: 'User',
    tableName: "users",
  });
