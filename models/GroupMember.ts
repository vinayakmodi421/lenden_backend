import { DataTypes, Model, Sequelize } from "sequelize";
import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";

export class GroupMember extends Model<
  InferAttributes<GroupMember>,
  InferCreationAttributes<GroupMember>
> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare groupId: number;
  declare isAdmin: CreationOptional<boolean>;
  declare isAccepted: CreationOptional<boolean>;
  declare owedAmount: CreationOptional<string>;
  declare amountPaid: CreationOptional<string>;
  declare deactivated: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initGroupMember(sequelize: Sequelize): typeof GroupMember {
  GroupMember.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: DataTypes.INTEGER, allowNull: false, field: "user_id" },
      groupId: { type: DataTypes.INTEGER, allowNull: false, field: "group_id" },
      isAdmin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: "is_admin" },
      isAccepted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: "is_accepted" },
      owedAmount: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0, field: "owed_amount" },
      amountPaid: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0, field: "amount_paid" },
      deactivated: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "group_members",
      modelName: "GroupMember",
      underscored: true,
      indexes: [{ unique: true, fields: ["user_id", "group_id"] }],
    },
  );
  return GroupMember;
}
