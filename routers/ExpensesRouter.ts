import express from "express"
import { authenticate } from "../middlewares/auth.js";
import {  deleteExpenses, showDashboard, showMember, updateExpenses, viewExpense } from "../controllers/ExpensesController.js";

const expensesRouter = express.Router();

expensesRouter.put("/expense/:id" ,authenticate , updateExpenses);

expensesRouter.put("/expense-del/:id" , authenticate , deleteExpenses);

expensesRouter.get("/expense/:id" , authenticate , viewExpense);

expensesRouter.get("/expenses/dashboard/:id" , authenticate , showDashboard);

expensesRouter.get("/showMember/:id" , authenticate , showMember);

export default expensesRouter

