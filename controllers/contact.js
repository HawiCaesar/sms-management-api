import db from "../models/index";

export const createContact = (request, response) => {
  return db.Contact.create({
    name: request.body.name,
    phone: request.body.phone
  })
    .then(contact => {
      response.status(201).send({
        message: "contact created",
        contact
      });
    })
    .catch(error => {
      response.status(400).send({
        message: "An error occured",
        error
      });
    });
};

export const getAllContacts = (request, response) => {
  return db.Contact.findAll().then(contacts => {
    response.status(200).send({
      contacts
    });
  });
};
