"use strict";
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      senderId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "The sender of the message cannot be empty"
          }
        }
      },
      receiverId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "The receiver of the message cannot be empty"
          }
        }
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "The message cannot be empty"
          }
        }
      }
    },
    {}
  );
  Message.associate = function(models) {
    Message.belongsTo(models.Contact, {
      foreignKey: "senderId",
      onDELETE: "CASCADE"
    });

    Message.belongsTo(models.Contact, {
      foreignKey: "receiverId",
      onDELETE: "CASCADE"
    });
  };
  return Message;
};
