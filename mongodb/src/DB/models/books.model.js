import { db } from "../connection.js";

export const booksModel = db.collection("books");

export const createBooksCollection = async () => {
    return await db.createCollection("books", {
        validator: {
            title: {
                $type: "string",
                $exists: true,
                $nin: [null, ""]
            }
        }
    });
};

export const createBooksTitleIndex = async () => {
    return await booksModel.createIndex({ title: 1 });
};
