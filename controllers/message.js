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
