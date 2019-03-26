import db from "../models/index";

export const checkSender = (request, response, next) => {
  return db.Contact.findOne({
    where: {
      phone: request.body.senderId
    }
  })
    .then(contact => {
      if (!contact) {
        return response
          .status(404)
          .send({ message: "sender contact not found" });
      }
      next();
    })
    .catch(error =>
      response.status(400).send({ message: "senderId missing", error })
    );
};

export const checkReceiver = (request, response, next) => {
  return db.Contact.findOne({
    where: {
      phone: request.body.receiverId
    }
  })
    .then(contact => {
      if (!contact) {
        return response
          .status(404)
          .send({ message: "receiver contact not found" });
      }
      next();
    })
    .catch(error =>
      response.status(400).send({ message: "receiverId missing", error })
    );
};
