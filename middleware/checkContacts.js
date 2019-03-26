import db from "../models/index";

export const checkSender = (request, response, next) => {
  return db.Contact.findOne({
    where: {
      phone: request.body.sender
    }
  })
    .then(contact => {
      if (!contact) {
        return response
          .status(404)
          .send({ message: "sender contact not found" });
      }
      request.body.senderId = contact.dataValues.id;
      next();
    })
    .catch(error =>
      response.status(400).send({ message: "sender value missing", error })
    );
};

export const checkReceiver = (request, response, next) => {
  return db.Contact.findOne({
    where: {
      phone: request.body.receiver
    }
  })
    .then(contact => {
      if (!contact) {
        return response
          .status(404)
          .send({ message: "receiver contact not found" });
      }
      request.body.receiverId = contact.dataValues.id;
      next();
    })
    .catch(error =>
      response.status(400).send({ message: "receiver value missing", error })
    );
};
