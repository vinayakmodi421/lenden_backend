import { DataTypes, Model, Sequelize } from "sequelize";
import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";

export class Otp extends Model<
  InferAttributes<Otp>,
  InferCreationAttributes<Otp>
> {
  declare id: CreationOptional<number>;
  declare otp: string;
  declare userId: CreationOptional<number | null>;
  declare email: string;
  declare otpExpiry: Date;
  declare deactivated: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initOtp(sequelize: Sequelize): typeof Otp {
  Otp.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      otp: { type: DataTypes.STRING(10), allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: true, field: "user_id" },
      email: { type: DataTypes.STRING(255), allowNull: false },
      otpExpiry: { type: DataTypes.DATE, allowNull: false, field: "otp_expiry" },
      deactivated: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "otps",
      modelName: "Otp",
      underscored: true,
      indexes: [{ fields: ["email"] }, { fields: ["user_id"] }],
    },
  );
  return Otp;
}
