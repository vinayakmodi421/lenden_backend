import { DataTypes, Model, Sequelize } from "sequelize";
import type { CreationOptional, InferAttributes, InferCreationAttributes, NonAttribute } from "sequelize";
import type { Message } from "./Message.js";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare phoneNo: CreationOptional<string | null>;
  declare password: string;
  declare username: string;
  declare isEmailVerified: CreationOptional<boolean>;
  declare deactivated: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare messages?: NonAttribute<Message[]>;
}

export function initUser(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
      phoneNo: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: true,
        field: "phone_no",
      },
      password: { type: DataTypes.STRING(255), allowNull: false },
      username: { type: DataTypes.STRING(100), allowNull: false },
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_email_verified",
      },
      deactivated: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize, tableName: "users", modelName: "User", underscored: true },
  );
  return User;
}
