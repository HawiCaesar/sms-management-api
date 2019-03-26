import db from "../models/index";
import validContacts from "./fixtures";

export default () => {
  return db.Contact.bulkCreate(validContacts, { returning: true });
};
