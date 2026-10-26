import { DataTypes, Model, Sequelize } from "sequelize";
import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";

export class Request extends Model<
  InferAttributes<Request>,
  InferCreationAttributes<Request>
> {
  declare id: CreationOptional<number>;
  declare senderUserId: number;
  declare receiverUserId: number;
  declare groupId: number;
  declare isAdded: CreationOptional<boolean>;
  declare deactivated: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initRequest(sequelize: Sequelize): typeof Request {
  Request.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      senderUserId: { type: DataTypes.INTEGER, allowNull: false, field: "sender_user_id" },
      receiverUserId: { type: DataTypes.INTEGER, allowNull: false, field: "receiver_user_id" },
      groupId: { type: DataTypes.INTEGER, allowNull: false, field: "group_id" },
      isAdded: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: "is_added" },
      deactivated: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize, tableName: "requests", modelName: "Request", underscored: true },
  );
  return Request;
}
