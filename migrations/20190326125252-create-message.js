"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Messages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      senderId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Contacts",
          key: "id",
          as: "sentMessages"
        }
      },
      receiverId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Contacts",
          key: "id",
          as: "receivedMessages"
        }
      },
      message: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Messages");
  }
};
