const supertest = require("supertest");
const mongoose = require("mongoose");
const { app, server } = require("../index");
const User = require("../models/user.model");

const api = supertest(app);

describe("Testing auth services", () => {
    let refreshToken = "";

    beforeEach(async () => {
        await User.deleteMany({});

        const user = new User({
            name: "test",
            secondName: "test",
            email: "test@mail.com",
            password: "Sup3rTest!",
        });

        await user.save();
    });

    test("A user can sign in", async () => {
        const res = await api
            .post("/auth/signin")
            .send({
                email: "test@mail.com",
                password: "Sup3rTest!",
            })
            .expect(201);

        expect(res.body).toHaveProperty("refreshToken");
        expect(res.body).toHaveProperty("accessToken");

        if (res.body.refreshToken) {
            refreshToken = res.body.refreshToken;
        }
    });

    test("A user insert the incorrect pasword", async () => {
        await api
            .post("/auth/signin")
            .send({
                email: "test@mail.com",
                password: "wrongPassword",
            })
            .expect(401);
    });

    test("A user can refresh token", async () => {
        const res = await api
            .post("/auth/refresh")
            .send({
                refreshToken,
            })
            .expect(201);

        expect(res.body).toHaveProperty("accessToken");
    });

    test("A user can sign up", async () => {
        await api
            .post("/auth/signup")
            .send({
                name: "test2",
                secondName: "test2",
                email: "test2@mail.com",
                password: "Sup3rTest2!",
            })
            .expect(201);
    });

    test("A user cannot sign up with invalid email or password format", async () => {
        const res = await api
            .post("/auth/signup")
            .send({
                name: "test3",
                secondName: "test3",
                email: "test3@mail",
                password: "Sup3rTest2!",
            })
            .expect(400);
        expect(res.body.message).toContain("Invalid" || "invalid");
    });
});

afterAll(async () => {
    await User.deleteMany({});
    server.close();
    mongoose.connection.close();
});
