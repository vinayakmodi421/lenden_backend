import type { Sequelize } from "sequelize";
import { Expense, initExpense } from "./Expense.js";
import { Group, initGroup } from "./Group.js";
import { GroupMember, initGroupMember } from "./GroupMember.js";
import { Message, initMessage } from "./Message.js";
import { Notification, initNotification } from "./Notification.js";
import { Otp, initOtp } from "./Otp.js";
import { Receipt, initReceipt } from "./Receipt.js";
import { Request, initRequest } from "./Request.js";
import { User, initUser } from "./User.js";
import { initRefreshToken, RefreshToken } from "./Token.js";

export function initModels(sequelize: Sequelize) {
  initUser(sequelize);
  initGroup(sequelize);
  initGroupMember(sequelize);
  initExpense(sequelize);
  initMessage(sequelize);
  initRequest(sequelize);
  initReceipt(sequelize);
  initOtp(sequelize);
  initNotification(sequelize);
  initRefreshToken(sequelize)

  Group.hasMany(GroupMember, {
    foreignKey: "groupId",
    sourceKey: "id",
    as: "members",
  });

  GroupMember.belongsTo(Group, {
    foreignKey: "groupId",
    targetKey: "id",
    as: "group",
  });

  User.hasMany(Message, {
    foreignKey: "userId",
    sourceKey: "id",
    as: "messages",
  });
  Message.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id",
    as: "user",
  });

  Expense.hasMany(Notification, {
    foreignKey: "expenseId",
    as: "notifications",
  });
  Notification.belongsTo(Expense, {
    foreignKey: "expenseId",
    as: "expense",
  });

  Request.hasMany(Notification, {
    foreignKey: "requestId",
    as: "notifications",
  })
  Notification.belongsTo(Request, {
    foreignKey: "requestId",
    as: "request",
  });
  
  GroupMember.hasOne(User, {
    sourceKey: 'userId',
    foreignKey: 'id',
    as: 'user',
  });

  User.belongsTo(GroupMember, {
    targetKey: 'userId',
    foreignKey: 'id',
    as: 'user',
  });

  return { User, Group, GroupMember, Expense, Message, Request, Receipt, Otp, Notification , RefreshToken };
}

export { User, Group, GroupMember, Expense, Message, Request, Receipt, Otp, Notification , RefreshToken };
