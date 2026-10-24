import { Router } from "express";
import * as book from "./books.service.js";

export const booksRouter = Router();

booksRouter.post("/books", async (req, res) => {
    const result = await book.createBooks();

    res.status(201).json(result);
});

booksRouter.post("/books/index", async (req, res) => {
    const result = await book.createTitleIndex();
    res.status(200).json(result);
});

booksRouter.post("/books/insert", async (req, res) => {
    let newBook = await book.insertOne(req.body);
    return res.status(201).json({
        message: "Book added successfully",
        data: newBook
    });
});

booksRouter.post("/batch", async(req, res)=>
{
    let books = await book.insertMany(req.body)
    res.status(201).json({
       message: "Books processed successfully",
        data: books

    })

})

booksRouter.patch("/books/Future",async(req,res)=>{
    const result = await book.updateFuture()
    res.status(200).json({data:result})
})

booksRouter.get("/books/title",async(req,res)=>{
    let result = await book.findBook(req.query.title)
    res.status(200).json({data:result})
})

booksRouter.get("/books/year", async (req, res) => {
    const { from, to } = req.query;

    const result = await book.findBooksByYear(from, to);

    res.status(200).json({ data: result });
});

booksRouter.get("/books/genre", async (req, res) => {
    const result = await book.findBooksByGenre(req.query.genre);

    res.status(200).json({ data: result });
});

booksRouter.get("/books/skip-limit", async (req, res) => {
    const result = await book.getBooksPage();

    res.status(200).json({ data: result });
});

booksRouter.get("/books/integer-year", async (req, res) => {
    const result = await book.findBooksWithIntegerYear();

    res.status(200).json({ data: result });
});

booksRouter.get("/books/exclude-genres", async (req, res) => {
    const result = await book.findBooksWithoutGenres();

    res.status(200).json({ data: result });
});

booksRouter.delete("/books/before-year", async (req, res) => {
    const result = await book.deleteBooksBeforeYear(req.query.year);

    res.status(200).json({ data: result });
});

booksRouter.get("/books/aggregate1", async (req, res) => {
    const result = await book.aggregateBooksByYear();

    res.status(200).json({ data: result });
});

booksRouter.get("/books/aggregate2", async (req, res) => {
    const result = await book.aggregateBooksDetails();

    res.status(200).json({ data: result });
});

booksRouter.get("/books/aggregate3", async (req, res) => {
    const result = await book.unwindBookGenres();

    res.status(200).json({ data: result });
});