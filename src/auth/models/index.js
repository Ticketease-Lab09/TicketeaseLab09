'use strict';
require('dotenv').config();
const userModel = require('./users.model.js');
const CustomerTicketModel = require('./CustomerTicket.model.js');
const AgentTicketModel = require ('./AgentTicket.model.js');
const { Sequelize, DataTypes } = require('sequelize');




const DATABASE_URL= process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;
const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);


const CustomerTicketTable = CustomerTicketModel(sequelize, DataTypes);
const AgentTicketTable = AgentTicketModel(sequelize, DataTypes);
const userTable = userModel(sequelize, DataTypes);


userTable.hasMany(CustomerTicketTable, {
    foreignKey: 'UserId',
    sourceKey: 'id',
});
CustomerTicketTable.belongsTo(userTable, {
    foreignKey: 'UserId',
    targetKey: 'id',
});

userTable.hasMany(AgentTicketTable, {
  foreignKey: 'UserId',
  sourceKey: 'id',
});
AgentTicketTable.belongsTo(userTable, {
  foreignKey: 'UserId',
  targetKey: 'id',
});




module.exports = {
  db: sequelize,
  users: userTable,
  AgentTicket : AgentTicketTable,
  CustomerTicket : CustomerTicketTable
}
