'use strict';
const AgentTicket= (sequelize, DataTypes) => sequelize.define('AgentTicket', {
  agentTicketSubject: { type: DataTypes.STRING, required: true },
  agentTicketDescription: { type: DataTypes.STRING, required: true },
  employeeComment: { type: DataTypes.STRING},
  UserId: {type: DataTypes.INTEGER,allowNull: false}
});

module.exports = AgentTicket;
