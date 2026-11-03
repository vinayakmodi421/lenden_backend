import type { Sequelize } from "sequelize";
import { Expense, initExpense } from "./Expense.js";
import { Group, initGroup } from "./Group.js";
import { GroupMember, initGroupMember } from "./GroupMember.js";
import { Message, initMessage } from "./Message.js";
import { MessageReceipt, initMessageReceipt } from "./MsgStatus.js";
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
  initMessageReceipt(sequelize);
  initRequest(sequelize);
  initReceipt(sequelize);
  initOtp(sequelize);
  initNotification(sequelize);
  initRefreshToken(sequelize)

  // group and its member
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

  // messages and its user
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

  // expense and its notification
  Expense.hasMany(Notification, {
    foreignKey: "expenseId",
    as: "notifications",
  });
  Notification.belongsTo(Expense, {
    foreignKey: "expenseId",
    as: "expense",
  });

  // request and its notification
  Request.hasMany(Notification, {
    foreignKey: "requestId",
    as: "notifications",
  })
  Notification.belongsTo(Request, {
    foreignKey: "requestId",
    as: "request",
  });
  
  // groupMember and its user
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

  // group and its messages
  Group.hasMany(Message , {
    sourceKey : "id",
    foreignKey : "groupId",
    as : "messages",
  })

  Message.belongsTo(Group , {
    targetKey : "id",
    foreignKey : "groupId",
    as : "messages",
  })

  // group last msg and its messages
  Group.hasOne(Message , {
    sourceKey : "lastMessageId",
    foreignKey : "id",
    as : "lastMessage",
  })

  Message.belongsTo(Group , {
    targetKey : "lastMessageId",
    foreignKey : "id",
    as : "lastMessage",
  })

  //groupMember and its messages
  GroupMember.hasMany(Message , {
    sourceKey : "groupId",
    foreignKey : "groupId",
    as : "latestMsg",
  })

  Message.belongsTo(GroupMember , {
    targetKey : "groupId",
    foreignKey : "groupId",
    as : "latestMsg",
  })

  return { User, Group, GroupMember, Expense, Message, MessageReceipt, Request, Receipt, Otp, Notification , RefreshToken };
}

export { User, Group, GroupMember, Expense, Message, MessageReceipt, Request, Receipt, Otp, Notification , RefreshToken };
