import { describe, it, beforeEach, expect } from "vitest";
const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../test.js");
const User = require("../models/user.model.js");

const validUser = {
  name: "Anas Yakubu",
  email: "yakubuanas@gmail.com",
  username: "anasyakubu",
  password: "123456",
  pin: "050902",
};

const loginUser = (pin) => {
  return request(app).post("/login").send({ pin });
};

describe("User Login", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await User.create(validUser);
  });

  it("returns 200 OK when login request is valid", async () => {
    const response = await loginUser(validUser.pin);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Authentication Successfully!");
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("userId");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("username");
    // expect(response.body).toHaveProperty("userImage");
  });

  it("returns 400 when PIN is not provided", async () => {
    const response = await loginUser("");
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Authentication PIN is required");
  });

  it("returns 400 when PIN does not match any user", async () => {
    const response = await loginUser("999999");
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Authentication PIN Not Matched");
  });

  it("returns 400 when PIN is incorrect", async () => {
    const response = await loginUser("123456");
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Authentication PIN Not Matched");
  });
});
