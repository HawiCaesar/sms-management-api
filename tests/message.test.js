import "babel-polyfill";
import requests from "supertest";
import app from "../app";
import { destroyContacts } from "./teardown";
import createTestContacts from "./setup";

const api = new requests(app);

const sms = {
  senderId: "872378328",
  receiverId: "1890923",
  message: "Hello"
};

const nonExistingSender = {
  senderId: "87237832899",
  receiverId: "1890923",
  message: "Hello"
};

const nonExistingReceiver = {
  senderId: "872378328",
  receiverId: "1890923990",
  message: "Hello"
};

describe("/api/message tests", () => {
  beforeAll(async () => {
    await createTestContacts();
  });

  afterAll(async () => {
    await destroyContacts();
  });

  it("should create a message", done => {
    api
      .post("/api/message")
      .set("Content-Type", "application/json")
      .send(sms)
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(201);
        expect(response.body.status).toMatch("success");
        done();
      });
  });

  it("should show an error if the sender does not exist", done => {
    api
      .post("/api/message")
      .set("Content-Type", "application/json")
      .send(nonExistingSender)
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(404);
        expect(response.body.message).toMatch("sender contact not found");
        done();
      });
  });

  it("should show an error if the receiver does not exist", done => {
    api
      .post("/api/message")
      .set("Content-Type", "application/json")
      .send(nonExistingReceiver)
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(404);
        expect(response.body.message).toMatch("receiver contact not found");
        done();
      });
  });
});
