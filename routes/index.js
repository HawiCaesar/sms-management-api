import express from "express";
import { createContact, getAllContacts } from "../controllers/contact";

const Route = express.Router();

Route.post("/contacts", createContact);
Route.get("/contacts", getAllContacts);

export default Route;
