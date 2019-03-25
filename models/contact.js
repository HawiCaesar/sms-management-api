"use strict";
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    "Contact",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "The name of the contact cannot be empty"
          },
          len: {
            args: [2, 20],
            msg:
              "The name must be atleast 2 characters in length and a maximum of 20 characters in length"
          }
        }
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            name: "phoneNumberAlready",
            msg: "The phone number of the contact cannot be empty"
          }
        },
        unique: {
          args: true,
          msg: "This contact phone number already exists"
        }
      }
    },
    {}
  );
  Contact.associate = function(models) {
    Contact.hasMany(models.Message, {
      foreignKey: "senderId",
      as: "sentMessages"
    });

    Contact.hasMany(models.Message, {
      foreignKey: "receiverId",
      as: "receivedMessages"
    });
  };
  return Contact;
};
