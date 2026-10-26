import { DataTypes, Model, Sequelize } from "sequelize";
import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";

export class Receipt extends Model<
  InferAttributes<Receipt>,
  InferCreationAttributes<Receipt>
> {
  declare id: CreationOptional<number>;
  declare expenseId: CreationOptional<number | null>;
  declare paidByUserId: number;
  declare imageUrl: CreationOptional<string | null>;
  declare deactivated: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initReceipt(sequelize: Sequelize): typeof Receipt {
  Receipt.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      expenseId: { type: DataTypes.INTEGER, allowNull: true, field: "expense_id" },
      paidByUserId: { type: DataTypes.INTEGER, allowNull: false, field: "paid_by_user_id" },
      imageUrl: { type: DataTypes.STRING(500), allowNull: true, field: "image_url" },
      deactivated: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize, tableName: "receipts", modelName: "Receipt", underscored: true },
  );
  return Receipt;
}
