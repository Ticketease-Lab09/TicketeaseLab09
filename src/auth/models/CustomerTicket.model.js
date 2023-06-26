'use strict';
const CustomerTicket= (sequelize, DataTypes) => sequelize.define('CustomerTicket', {
  CustomerTicketSubject: { type: DataTypes.STRING, required: true },
  CustomerTicketDescription: { type: DataTypes.STRING, required: true },
  UserId: {type: DataTypes.INTEGER}
});

module.exports = CustomerTicket;
