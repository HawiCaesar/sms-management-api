import "babel-polyfill";
import requests from "supertest";
import app from "../app";
import { destroyContacts, destroyMessages } from "./teardown";
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

  afterEach(async () => {
    await destroyMessages();
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

  it("should delete message", done => {
    const newSms = {
      senderId: "1890923",
      receiverId: "872378328",
      message: "Hello there"
    };

    api
      .post("/api/message")
      .set("Content-Type", "application/json")
      .send(newSms)
      .end((error, postResponse) => {
        if (error) {
          throw done(error);
        }
        api
          .delete("/api/message/1")
          .set("Content-Type", "application/json")
          .end((error, response) => {
            if (error) {
              throw done(error);
            }
            expect(response.status).toEqual(204);
            done();
          });
      });
  });

  it("should show an error message when deleting non-existing message", done => {
    api
      .delete("/api/message/45")
      .set("Content-Type", "application/json")
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(404);
        expect(response.body.message).toMatch("Message does not exist");
        done();
      });
  });
});
