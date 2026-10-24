import { db } from "../../DB/connection.js";
import { logsModel } from "../../DB/models/logs.model.js";

import { ObjectId } from "mongodb";

export const createLogs = async () => {
    const exists = await db
        .listCollections({ name: "logs" })
        .hasNext();

    if (exists) {
        const error = new Error("Logs collection already exists");
        error.status = 409;
        throw error;
    }

    await db.createCollection("logs", {
        capped: true,
        size: 1024 * 1024
    });

    return { ok: 1 };
};

export const insertLog = async(body)=>{

    return await logsModel.insertOne({
        ...body,
        book_id: new ObjectId(body.book_id)
    });


}

export const getLogsWithBooks = async () => {
    return await logsModel.aggregate([
        {
            $lookup: {
                from: "books",
                localField: "book_id",
                foreignField: "_id",
                as: "book_details"
            }
        },
        {
            $project: {
                _id: 0,
                action: 1,
                "book_details.title": 1,
                "book_details.author": 1,
                "book_details.year": 1
            }
        }
    ]).toArray();
};
