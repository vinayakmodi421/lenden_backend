import { DataTypes, Model, Sequelize } from "sequelize";
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

export class RefreshToken extends Model<
  InferAttributes<RefreshToken>,
  InferCreationAttributes<RefreshToken>
> {
  declare id: CreationOptional<string>;
  declare userId: number;
  declare isActive: CreationOptional<boolean>;
  declare refreshToken: string;
  declare expiresAt: Date;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initRefreshToken(
  sequelize: Sequelize,
): typeof RefreshToken {
  RefreshToken.init(
    {
      id: {
        type: DataTypes.STRING,
        // autoIncrement: true,
        primaryKey: true,
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
      },

      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: "is_active",
      },

      refreshToken: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "refresh_token",
      },

      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "expires_at",
      },

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "refresh_tokens",
      modelName: "RefreshToken",
      underscored: true,
    },
  );

  return RefreshToken;
}