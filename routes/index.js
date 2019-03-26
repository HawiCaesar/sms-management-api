import express from "express";
import {
  createContact,
  getAllContacts,
  getOneContact,
  updateContact,
  deleteContact,
  getSentMessagesByContact,
  getReceivedMessagesByContact
} from "../controllers/contact";

import { createMessage, deleteMessage } from "../controllers/message";
import { checkSender, checkReceiver } from "../middleware/checkContacts";
import phoneValidation from "../middleware/phoneValidation";

const Route = express.Router();

Route.post("/contacts", phoneValidation, createContact);
Route.get("/contacts", getAllContacts);
Route.get("/contacts/:contactId", getOneContact);
Route.put("/contacts/:contactId", phoneValidation, updateContact);
Route.delete("/contacts/:contactId", deleteContact);

Route.post("/message", checkSender, checkReceiver, createMessage);
Route.delete("/message/:messageId", deleteMessage);
Route.get("/message/sent-messages/:phone", getSentMessagesByContact);
Route.get("/message/received-messages/:phone", getReceivedMessagesByContact);

export default Route;
