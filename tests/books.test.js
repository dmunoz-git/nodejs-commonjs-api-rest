const supertest = require("supertest");
const mongoose = require("mongoose");
const { app, server } = require("../index");
const Book = require("../models/book.model");
const User = require("../models/user.model");

const api = supertest(app);

const user = {
    name: "Jhon",
    secondName: "Doe",
    email: "jhon.doe@mail.com",
    password: "JhonDo3!",
};

const book = {
    title: "Harry Potter and the the filosofal stone",
    author: "J. K. Rowling",
    isbn: 9788478884452,
};

describe("Testing books endpoints", () => {
    let accesssToken = "";

    beforeEach(async () => {
        await Book.deleteMany({});
        await User.deleteMany({});

        const tuser = new User(user);
        const tbook = new Book({
            title: "The Grapes of Wrath",
            isbn: "9780804137785",
            description: "A book about the Grapes of Wrath",
            author: "John Steinbeck",
        });

        await tbook.save();
        await tuser.save();

        const tokens = await api.post("/auth/signin").send({
            email: user.email,
            password: user.password,
        });

        accesssToken = tokens.body.accessToken;
    });

    test("Create a book", async () => {
        await api.post("/books").send(book).set("Authorization", accesssToken).expect(201);
    });

    test("Get book detail", async () => {
        await api.get(`/books/9780804137785`).expect(201);
    });

    test("Update a book", async () => {
        await api
            .put("/books/9780804137785")
            .send({ title: "The Grapes of Wrath (Paperback)" })
            .set("Authorization", accesssToken)
            .expect(201);

        const res = await api.get("/books/9780804137785").expect(201);
        expect(res.body.title).toBe("The Grapes of Wrath (Paperback)");
    });

    test("Listing two books", async () => {
        const res = await api.get("/books").expect(201);
        expect(res.body).toBeDefined();
    });

    test("Remove a book", async () => {
        await api.delete("/books/9780441000685").set({ Authorization: accesssToken }).expect(201);
    });
});

afterAll(() => {
    server.close();
    mongoose.connection.close();
});
