import { DataTypes, Model, Sequelize } from "sequelize";
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

export type MessageReceiptStatus = "sent" | "delivered" | "seen";

export class MessageReceipt extends Model<
  InferAttributes<MessageReceipt>,
  InferCreationAttributes<MessageReceipt>
> {
  declare id: CreationOptional<number>;
  declare messageId: number;
  declare userId: number;
  declare status: CreationOptional<MessageReceiptStatus>;
  declare deliveredAt: CreationOptional<Date | null>;
  declare seenAt: CreationOptional<Date | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initMessageReceipt(sequelize: Sequelize): typeof MessageReceipt {
  MessageReceipt.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      messageId: { type: DataTypes.INTEGER, allowNull: false, field: "message_id" },
      userId: { type: DataTypes.INTEGER, allowNull: false, field: "user_id" },
      status: {
        type: DataTypes.ENUM("sent", "delivered", "seen"),
        allowNull: false,
        defaultValue: "sent",
      },
      deliveredAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        field: "delivered_at",
      },
      seenAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        field: "seen_at",
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "message_receipts",
      modelName: "MessageReceipt",
      underscored: true,
      indexes: [{ unique: true, fields: ["message_id", "user_id"] }],
    },
  );
  return MessageReceipt;
}
