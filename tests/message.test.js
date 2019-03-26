import "babel-polyfill";
import requests from "supertest";
import app from "../app";
import { destroyContacts, destroyMessages } from "./teardown";
import createTestContacts from "./setup";

const api = new requests(app);

const sms = {
  sender: "254927033477",
  receiver: "254727133477",
  message: "Hello"
};

const nonExistingSender = {
  sender: "87237832899",
  receiver: "254727133477",
  message: "Hello"
};

const nonExistingReceiver = {
  sender: "254927033477",
  receiver: "1890923990",
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
        expect(response.body.response.status).toMatch("sent");
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
      sender: "254927033477",
      receiver: "254727133477",
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

  it("should see a list of received messages from contact", done => {
    const checkReceiveSms = {
      sender: "254729233477",
      receiver: "254500233477",
      message: "Hello..."
    };
    api
      .post("/api/message")
      .set("Content-Type", "application/json")
      .send(checkReceiveSms)
      .end((postError, postResponse) => {
        if (postError) {
          throw done(postError);
        }
        api
          .get("/api/message/received-messages/254500233477")
          .end((error, response) => {
            if (error) {
              throw done(error);
            }
            expect(response.status).toEqual(200);
            expect(response.body.contact.phone).toMatch("254500233477");
            expect(response.body.receivedMessages.length).toEqual(1);
            done();
          });
      });
  });

  it("should see a list of sent messages from contact", done => {
    const checkSentSms = {
      sender: "254729233477",
      receiver: "254500233477",
      message: "My gooodnesssss"
    };
    api
      .post("/api/message")
      .set("Content-Type", "application/json")
      .send(checkSentSms)
      .end((postError, postResponse) => {
        if (postError) {
          throw done(postError);
        }
        api
          .get("/api/message/sent-messages/254729233477")
          .end((error, response) => {
            if (error) {
              throw done(error);
            }
            expect(response.status).toEqual(200);
            expect(response.body.contact.phone).toMatch("254729233477");
            expect(response.body.sentMessages.length).toEqual(1);
            done();
          });
      });
  });
});
