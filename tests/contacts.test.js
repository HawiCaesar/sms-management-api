import "babel-polyfill";
import requests from "supertest";
import app from "../app";
import { destroyContacts } from "./teardown";
import { validContact } from "./fixtures";

const api = new requests(app);

describe("/api/contacts tests", () => {
  afterAll(async () => {
    await destroyContacts();
  });

  it("should create a contact successfully, /api/contacts POST", done => {
    api
      .post("/api/contacts")
      .set("Content-Type", "application/json")
      .send(validContact)
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
      .send(validContact)
      .end((postError, postResponse) => {
        if (postError) {
          throw done(postError);
        }
        api
          .post("/api/contacts")
          .set("Content-Type", "application/json")
          .send(validContact)
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
      .send(validContact)
      .end((postError, postResponse) => {
        if (postError) {
          throw done(postError);
        }
        api
          .put("/api/contacts/1")
          .set("Content-Type", "application/json")
          .send({ phone: "6768329823" })
          .end((updateError, response) => {
            if (updateError) {
              throw done(updateError);
            }
            expect(response.status).toEqual(200);
            expect(response.body.contact.phone).toMatch("6768329823");
            done();
          });
      });
  });
});
