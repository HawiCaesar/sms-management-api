import db from "../models/index";

export const destroyContacts = () => {
  return db.Contact.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true
  });
};
