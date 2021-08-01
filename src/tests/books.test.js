const supertest = require("supertest");
const mongoose = require("mongoose");
const { app, server } = require("../index");
const Book = require("../models/book.model");

const api = supertest(app);

describe("Testing books endpoints", () => {
    beforeEach(async () => {
        await Book.deleteMany({});

        const tbook = new Book({
            author: "William Gibson",
            title: "Neuromancer",
            isbn: 9780441000685,
            image: "https://pictures.abebooks.com/isbn/9780441000685-es.jpg",
        });

        tbook.save();
    });

    test.skip("Respons in json", async () => {
        await api
            .get("/books")
            .expect(201)
            .expect("Content-Type", /application\/json/);
    });

    test.skip("Create a book", async () => {
        await api
            .post("/books")
            .send({
                title: "Harry Potter and the the filosofal stone",
                author: "J. K. Rowling",
                isbn: 9788478884452,
                image: "https://images-na.ssl-images-amazon.com/images/I/51ifu1aebKL._SY264_BO1,204,203,200_QL40_ML2_.jpg",
            })
            .expect(201);
    });

    test.skip("Get book detail", async () => {
        const res = await api.get("/books/9780441000685").expect(201);
        expect(res.body.isbn).toBe(9780441000685);
    });

    test.skip("Update a book", async () => {
        await api.put("/books/9780441000685").send({ title: "Neuromancer (Paperback)" }).expect(201);
        const res = await api.get("/books/9780441000685");
        expect(res.body.title).toBe("Neuromancer (Paperback)");
    });

    test.skip("Listing two books", async () => {
        const res = await api.get("/books").expect(201);
        expect(res.body).toBeDefined();
    });

    test.skip("Remove a book", async () => {
        await api.delete("/books/9780441000685").expect(201);
    });
});

afterAll(() => {
    server.close();
    mongoose.connection.close();
});
