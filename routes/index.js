import express from "express";
import {
  createContact,
  getAllContacts,
  updateContacts
} from "../controllers/contact";

const Route = express.Router();

Route.post("/contacts", createContact);
Route.get("/contacts", getAllContacts);
Route.put("/contacts/:contactId", updateContacts);

export default Route;
