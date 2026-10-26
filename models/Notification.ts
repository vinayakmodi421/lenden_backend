
import { DataTypes, Model, Sequelize } from "sequelize";
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

export type NotificationType = "request" | "expense" | "general";

export class Notification extends Model<
  InferAttributes<Notification>,
  InferCreationAttributes<Notification>
> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare groupId: CreationOptional<number | null>;
  declare type: NotificationType;
  declare title: string;
  declare description: string;

  declare requestId: CreationOptional<number | null>;
  declare expenseId: CreationOptional<number | null>;

  declare imageUrl: CreationOptional<string | null>;
  declare isRead: CreationOptional<boolean>;
  declare deactivated: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initNotification(
  sequelize: Sequelize
): typeof Notification {
  Notification.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "group_id",
      },
      type: {
        type: DataTypes.ENUM("request", "expense", "general"),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      requestId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "request_id",
      },
      expenseId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "expense_id",
      },
      imageUrl: {
        type: DataTypes.STRING(500),
        allowNull: true,
        field: "image_url",
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_read",
      },
      deactivated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "notifications",
      modelName: "Notification",
      underscored: true,
    }
  );

  return Notification;
}

