import { describe, it, beforeEach, expect } from "vitest";
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../test.js");
const User = require("../models/user.model.js");

const validUser = {
  name: "Anas Yakubu",
  email: "yakubuanas@gmail.com",
  username: "anasyakubu",
  userImage:
    "https://firebasestorage.googleapis.com/v0/b/first-crud-f85ea.appspot.com/o/anasyakubu-cms-images%2F102716454.jpeg?alt=media&token=c651a181-7078-48f6-a7b7-293dbb49f301",
  password: "123456",
  pin: "050902",
};

const postUser = (user = validUser) => {
  return request(app).post("/register").send(user);
};

describe("User Registration", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    // await User.create(validUser);
  });

  it("returns 201 Created when signup request is valid", async () => {
    const response = await postUser();
    expect(response.status).toBe(201);
  });

  it("returns proper error when name is not provided", async () => {
    const response = await postUser({ ...validUser, name: "" });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Name is required");
  });

  it("returns proper error when email is not provided", async () => {
    const response = await postUser({ ...validUser, email: "" });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Email is required");
  });

  it("returns proper error when username is not provided", async () => {
    const response = await postUser({ ...validUser, username: "" });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Username is required");
  });

  it("returns proper error when password is less than 4 characters", async () => {
    const response = await postUser({ ...validUser, password: "123" });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      "Password is required and it should be 4 characters long"
    );
  });

  it("returns proper error when PIN is less than 6 characters", async () => {
    const response = await postUser({ ...validUser, pin: "12345" });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("PIN should be 6 characters long");
  });

  it("returns proper error when email is already taken", async () => {
    await postUser();
    const response = await postUser();
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Email Already Taken");
  });
});
