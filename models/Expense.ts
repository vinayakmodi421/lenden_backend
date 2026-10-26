import { DataTypes, Model, type Sequelize } from "sequelize";
import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";

export class Expense extends Model<
  InferAttributes<Expense>,
  InferCreationAttributes<Expense>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare money: string;
  declare currency: CreationOptional<string>;
  declare note: CreationOptional<string | null>;
  declare paidByUserId: number;
  declare location: CreationOptional<string | null>;
  declare paymentMode: CreationOptional<string | null>;
  declare groupId: number;
  declare tripCompleted: CreationOptional<boolean>;
  declare deactivated: CreationOptional<boolean>;
  declare msgId: CreationOptional<number | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initExpense(sequelize: Sequelize): typeof Expense {
  Expense.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: DataTypes.STRING(200), allowNull: false },
      money: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
      currency: { type: DataTypes.STRING(3), allowNull: false, defaultValue: "INR" },
      note: { type: DataTypes.TEXT, allowNull: true },
      paidByUserId: { type: DataTypes.INTEGER, allowNull: false, field: "paid_by_user_id" },
      location: { type: DataTypes.STRING(255), allowNull: true },
      paymentMode: { type: DataTypes.STRING(50), allowNull: true, field: "payment_mode" },
      groupId: { type: DataTypes.INTEGER, allowNull: false, field: "group_id" },
      tripCompleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: "trip_completed" },
      deactivated: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      msgId: { type: DataTypes.INTEGER, allowNull: true, field: "msg_id" },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize, tableName: "expenses", modelName: "Expense", underscored: true },
  );
  return Expense;
}
