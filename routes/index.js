import express from "express";
import {
  createContact,
  getAllContacts,
  getOneContact,
  updateContact
} from "../controllers/contact";

import { createMessage } from "../controllers/message";
import { checkSender, checkReceiver } from "../middleware/checkContacts";

const Route = express.Router();

Route.post("/contacts", createContact);
Route.get("/contacts", getAllContacts);
Route.get("/contacts/:contactId", getOneContact);
Route.put("/contacts/:contactId", updateContact);

Route.post("/message", checkSender, checkReceiver, createMessage);

export default Route;
