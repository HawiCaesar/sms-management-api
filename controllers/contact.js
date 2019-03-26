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
    return response.status(200).send({
      contacts
    });
  });
};

export const getOneContact = (request, response) => {
  return db.Contact.findOne({
    where: {
      id: request.params.contactId
    }
  })
    .then(contact => {
      if (!contact) {
        return response.status(404).send({ message: "Contact not found" });
      }
      return response.status(200).send({
        message: "Contact retrived",
        contact
      });
    })
    .catch(error =>
      response.status(404).send({ message: "Contact not found", error })
    );
};

export const updateContact = (request, response) => {
  return db.Contact.findOne({
    where: {
      id: request.params.contactId
    }
  })
    .then(contact => {
      if (!contact) {
        return response.status(404).send({ message: "Contact not found" });
      }
      return contact
        .update(request.body, {
          fields: Object.keys(request.body)
        })
        .then(updatedContact =>
          response.status(200).send({
            message: "Contact updated",
            contact: updatedContact
          })
        );
    })
    .catch(error =>
      response.status(404).send({ message: "Contact not found", error })
    );
};
