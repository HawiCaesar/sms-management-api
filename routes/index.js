import express from "express";
import {
  createContact,
  getAllContacts,
  getOneContact,
  updateContacts
} from "../controllers/contact";

const Route = express.Router();

Route.post("/contacts", createContact);
Route.get("/contacts", getAllContacts);
Route.get("/contacts/:contactId", getOneContact);
Route.put("/contacts/:contactId", updateContacts);

export default Route;
