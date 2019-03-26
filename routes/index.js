import express from "express";
import {
  createContact,
  getAllContacts,
  getOneContact,
  updateContact,
  deleteContact
} from "../controllers/contact";

import { createMessage, deleteMessage } from "../controllers/message";
import { checkSender, checkReceiver } from "../middleware/checkContacts";

const Route = express.Router();

Route.post("/contacts", createContact);
Route.get("/contacts", getAllContacts);
Route.get("/contacts/:contactId", getOneContact);
Route.put("/contacts/:contactId", updateContact);
Route.delete("/contacts/:contactId", deleteContact);

Route.post("/message", checkSender, checkReceiver, createMessage);
Route.delete("/message/:messageId", deleteMessage);

export default Route;
