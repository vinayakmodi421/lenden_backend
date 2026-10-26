import { DataTypes, Model, Sequelize } from "sequelize";
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

export class Group extends Model<
  InferAttributes<Group>,
  InferCreationAttributes<Group>
> {
  declare id: CreationOptional<number>;
  declare adminId: number; // 👈 added
  declare profilePic: CreationOptional<string | null>;
  declare name: string;
  declare description: CreationOptional<string | null>;
  declare totalMembers: CreationOptional<number>;
  declare deactivated: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initGroup(sequelize: Sequelize): typeof Group {
  Group.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "admin_id",
      },

      profilePic: {
        type: DataTypes.STRING(500),
        allowNull: true,
        field: "profile_pic",
      },

      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      totalMembers: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "total_members",
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
      tableName: "groups",
      modelName: "Group",
      underscored: true,
    },
  );
  return Group;
}