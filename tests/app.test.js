import requests from "supertest";
import app from "../app";

const api = new requests(app);

describe("Undefined routes", () => {
  it("should give an error message when accessing non-existing routes", done => {
    api.get("/someroute").end((error, response) => {
      expect(response.status).toEqual(404);
      expect(JSON.parse(response.text).message).toEqual("Resource not found");
      if (error) {
        throw done(error);
      }
      done();
    });
  });
});

describe("API route", () => {
  it("should show a message when navigating through /api", done => {
    api.get("/api").end((error, response) => {
      expect(response.status).toEqual(200);
      expect(response.body.message).toMatch(
        "SMS Management application API ready"
      );
      if (error) {
        throw done(error);
      }
      done();
    });
  });
});
