import db from "../models/index";

export const createMessage = (request, response) => {
  return db.Message.create({
    senderId: request.body.senderId,
    receiverId: request.body.receiverId,
    message: request.body.message
  })
    .then(message =>
      response.status(201).send({ status: "success", response: message })
    )
    .catch(error =>
      response.status(400).send({ status: "error", response: error })
    );
};

export const deleteMessage = (request, response) => {
  return db.Message.findOne({
    where: {
      id: request.params.messageId
    }
  }).then(message => {
    if (!message) {
      return response.status(404).send({ message: "Message does not exist" });
    }
    return message
      .destroy()
      .then(() => response.status(204).send())
      .catch(error => response.status(400).send({ message: `${error}` }));
  });
};
