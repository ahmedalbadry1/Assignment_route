import { db } from "../../DB/connection.js";
import { booksModel, createBooksCollection, createBooksTitleIndex } from "../../DB/models/index.js";

const checkBookExists = async (book) => {
    return await booksModel.findOne({
        title: book.title,
        author: book.author
    });
};
export const createBooks = async () => {
    const existingCollection = await db
        .listCollections({ name: "books" })
        .hasNext();

    if (existingCollection) {
        const error = new Error("Books collection already exists");
        error.status = 409;
        throw error;
    }

    await createBooksCollection();

    return { ok: 1 };
};

export const createTitleIndex = async () => {
    const collectionExists = await db
        .listCollections({ name: "books" })
        .hasNext();

    if (collectionExists && await booksModel.indexExists("title_1")) {
        const error = new Error("Books title index already exists");
        error.status = 409;
        throw error;
    }

    const indexName = await createBooksTitleIndex();

    return { indexName };
};

export const insertOne = async (body) => {
    const existingBook = await checkBookExists(body);

    if (existingBook) {
        const error = new Error("Book already exists");
        error.status = 409;
        throw error;
    }

    return await booksModel.insertOne(body);
};

export const insertMany = async (body) => {
    if (!Array.isArray(body) || body.length === 0) {
        const error = new Error("Send a non-empty array of books");
        error.status = 400;
        throw error;
    }

    const newBooks = [];
    let skippedCount = 0;

    for (let i = 0; i < body.length; i++) {
        const book = body[i];

        const existingBook = await checkBookExists(book);

        const repeatedInRequest = newBooks.some((item) => {
            return item.title === book.title &&
                   item.author === book.author;
        });

        if (existingBook || repeatedInRequest) {
            skippedCount++;
            continue;
        }

        newBooks.push(book);
    }

    if (newBooks.length === 0) {
        return { insertedCount: 0, skippedCount };
    }

    const result = await booksModel.insertMany(newBooks);

    return {
        insertedCount: result.insertedCount,
        insertedIds: result.insertedIds,
        skippedCount
    };
};

export const updateFuture = async()=>
{
    return await booksModel.updateOne( { title: "Future" },
    { $set: { year:2022 } })
}

export const findBook = async (name)=>{

   const result = await booksModel.findOne({title:name})
   if(!result)
   {
    const error = new Error  ("no such a book")
    error.status = 404;
    throw error
   }
   return result
}

export const findBooksByYear = async (from, to) => {
    return await booksModel.find({
        year: {
            $gte: Number(from),
            $lte: Number(to)
        }
    }).toArray()
};

export const findBooksByGenre = async (genre) => {
    if (typeof genre !== "string" || !genre.trim()) {
        const error = new Error("Genre is required");
        error.status = 400;
        throw error;
    }

    return await booksModel.find({ genres: genre }).toArray();
};

export const getBooksPage = async () => {
    return await booksModel.aggregate([
        { $sort: { year: -1 } },
        { $skip: 2 },
        { $limit: 3 }
    ]).toArray();
};
export const findBooksWithIntegerYear = async () => {
    return await booksModel.find({
        year: { $type: "int" }
    }).toArray();
};

export const findBooksWithoutGenres = async () => {
    return await booksModel.find({
        genres: { $nin: ["Horror", "Science Fiction"] }
    }).toArray();
};

export const deleteBooksBeforeYear = async (year) => {
    
    return await booksModel.deleteMany({
        year: { $lt: Number(year) }
    });
};

export const aggregateBooksByYear = async () => {
    return await booksModel.aggregate([
        { $match: { year: { $gt: 2000 } } },
        { $sort: { year: -1 } }
    ]).toArray();
};

export const aggregateBooksDetails = async () => {
    return await booksModel.aggregate([
        { $match: { year: { $gt: 2000 } } },
        { $project: { _id: 0, title: 1, author: 1, year: 1 } }
    ]).toArray();
};

export const unwindBookGenres = async () => {
    return await booksModel.aggregate([
        { $unwind: "$genres" },
        { $project: { _id: 0, title: 1, genres: 1 } }
    ]).toArray();
};
