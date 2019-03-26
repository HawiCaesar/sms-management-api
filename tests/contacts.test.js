import "babel-polyfill";
import requests from "supertest";
import app from "../app";
import { destroyContacts } from "./teardown";
import validContacts from "./fixtures";

const api = new requests(app);

describe("/api/contacts tests", () => {
  afterAll(async () => {
    await destroyContacts();
  });

  it("should create a contact successfully, /api/contacts POST", done => {
    api
      .post("/api/contacts")
      .set("Content-Type", "application/json")
      .send(validContacts[0])
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(201);
        expect(response.body.contact.name).toMatch("John Brown");
        done();
      });
  });

  it("should not create a contact with the same phone number", done => {
    api
      .post("/api/contacts")
      .set("Content-Type", "application/json")
      .send(validContacts[1])
      .end((postError, postResponse) => {
        if (postError) {
          throw done(postError);
        }
        api
          .post("/api/contacts")
          .set("Content-Type", "application/json")
          .send(validContacts[1])
          .end((postAgainError, postAgainResponse) => {
            if (postAgainError) {
              throw done(postAgainError);
            }
            expect(postAgainResponse.status).toEqual(400);
            expect(postAgainResponse.body.error.name).toMatch(
              "SequelizeUniqueConstraintError"
            );
            done();
          });
      });
  });

  it("should update a contact", done => {
    api
      .post("/api/contacts")
      .set("Content-Type", "application/json")
      .send(validContacts[2])
      .end((postError, postResponse) => {
        if (postError) {
          throw done(postError);
        }
        api
          .put("/api/contacts/1")
          .set("Content-Type", "application/json")
          .send({ phone: "09812345078" })
          .end((updateError, response) => {
            if (updateError) {
              throw done(updateError);
            }
            expect(response.status).toEqual(200);
            expect(response.body.contact.phone).toMatch("09812345078");
            done();
          });
      });
  });

  it("should read one contact", done => {
    api.get("/api/contacts/2").end((fetchError, response) => {
      if (fetchError) {
        throw done(fetchError);
      }
      expect(response.status).toEqual(200);
      expect(response.body.contact.name).toMatch("Derren Green");
      expect(response.body.contact.phone).toMatch("101201212");
      done();
    });
  });

  it("should show an error for a non-existing contact", done => {
    api.get("/api/contacts/99").end((fetchError, response) => {
      if (fetchError) {
        throw done(fetchError);
      }
      expect(response.status).toEqual(404);
      expect(response.body.message).toMatch("Contact not found");
      done();
    });
  });

  it("should delete a contact", done => {
    api
      .delete("/api/contacts/2")
      .set("Content-Type", "application/json")
      .end((deleteError, deleteResponse) => {
        if (deleteError) {
          throw done(deleteError);
        }
        expect(deleteResponse.status).toEqual(204);
        done();
      });
  });

  it("should not delete a contact that does not exist", done => {
    api
      .delete("/api/contacts/990")
      .set("Content-Type", "application/json")
      .end((deleteError, deleteResponse) => {
        if (deleteError) {
          throw done(deleteError);
        }
        expect(deleteResponse.status).toEqual(404);
        expect(deleteResponse.body.message).toMatch("Contact not found");
        done();
      });
  });
});
