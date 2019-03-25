const dotenv = require("dotenv");

dotenv.config();

const devUsername = process.env.DATABASE_USERNAME;
const devPassword = process.env.DATABASE_PASSWORD;
const devDatabase = process.env.DATABASE;
const testUsername = process.env.TEST_DATABASE_USERNAME;
const testPassword = process.env.TEST_DATABASE_USERNAME;
const testDatabase = process.env.TEST_DATABASE;

const config = {
  development: {
    username: devUsername,
    password: devPassword,
    database: devDatabase,
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres"
  },
  test: {
    username: testUsername,
    password: testPassword,
    database: testDatabase,
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres"
  }
};

module.exports = config;
