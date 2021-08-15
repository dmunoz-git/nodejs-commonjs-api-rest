const supertest = require("supertest");
const mongoose = require("mongoose");
const { app, server } = require("../index");
const User = require("../models/user.model");

const api = supertest(app);

describe("Testing auth services", () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    test("A user can sign up", async () => {
        await api
            .post("auth/signup")
            .send({
                name: "James",
                secondName: "Gordon",
                email: "james.gordon@mail.com",
                password: "1+2=3",
            })
            .expect(201);
    });

    test("A user can sign in", async () => {
        const res = await api
            .post("auth/signin")
            .send({
                email: "user@mail.com",
                password: "1+2=3",
            })
            .expect(201);

        expect(res.body).toContaningObject("refreshToken");
        expect(res.body).toContaningObject("acessToken");
    });
});

afterAll(() => {
    server.close();
    mongoose.connection.close();
});
