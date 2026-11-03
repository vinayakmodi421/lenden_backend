import { DataTypes, Model, Sequelize } from "sequelize";
import type { CreationOptional, InferAttributes, InferCreationAttributes, NonAttribute } from "sequelize";
import type { User } from "./User.js";

export type MessageStatus = "sent" | "delivered" | "read";
export type MessageType = "text" | "image" | "system";

export class Message extends Model<
  InferAttributes<Message>,
  InferCreationAttributes<Message>
> {
  declare id: CreationOptional<number>;
  declare groupId: number;
  declare userId: number;
  declare text: string;
  declare status: CreationOptional<MessageStatus>;
  declare messageType: CreationOptional<MessageType>;
  declare deactivated: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare user?: NonAttribute<User>;
  declare msgUsername: CreationOptional<string | null>;
}

export function initMessage(sequelize: Sequelize): typeof Message {
  Message.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      groupId: { type: DataTypes.INTEGER, allowNull: false, field: "group_id" },
      userId: { type: DataTypes.INTEGER, allowNull: false, field: "user_id" },
      text: { type: DataTypes.TEXT, allowNull: false },
      status: { type: DataTypes.ENUM("sent", "delivered", "read"), allowNull: false, defaultValue: "sent" },
      messageType: { type: DataTypes.ENUM("text", "image", "system", "expense"), allowNull: false, defaultValue: "text", field: "message_type" },
      deactivated: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      msgUsername: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "msg_username",
      },
    },
    { sequelize, tableName: "messages", modelName: "Message", underscored: true },
  );
  return Message;
}
