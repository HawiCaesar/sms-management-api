const dotenv = require("dotenv");

dotenv.config();

const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;
const database = process.env.DATABASE;
const testUser = process.env.TEST_DATABASE_USERNAME;
const testPassword = process.env.TEST_DATABASE_USERNAME;
const testDatabase = process.env.TEST_DATABASE;

const config = {
  development: {
    username,
    password,
    database,
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres"
  },
  test: {
    username: testUser,
    password: testPassword,
    database: testDatabase,
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres"
  }
};

module.exports = config;
