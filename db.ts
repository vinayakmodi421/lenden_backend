import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { initModels } from "./models/index.js";
dotenv.config();

const sequelize: Sequelize = new Sequelize(
  process.env.DB_NAME ?? "lenden_db",
  process.env.DB_USER ?? "root",
  process.env.DB_PASSWORD ?? "",
  {
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT),
    dialect: "mysql",
    logging: false,
  },
);

const connectDatabase = async (): Promise<void> => {
  try {
    initModels(sequelize)
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database connected successfully");
  } catch (error: unknown) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

export { sequelize, connectDatabase };