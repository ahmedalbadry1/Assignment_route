import * as br from "./base.repo.js";
import { noteModel } from "../db/models/notes.model.js";
import { userModel } from "../db/models/user.model.js";
import { Types } from "mongoose";

let model = noteModel

export const createNote = async ({ data }) => {
    return await br.create({
        data,
        model,
    });
};

export const findNote = async ({ filter }) => {
    return await br.find({
        filter,
        model,
    });
};

export const updateNote = async ({ filter, data }) => {
    return await br.update({
        filter,
        data,
        model,
    });
};
export const replaceNote = async ({ filter, data }) => {
    return await br.replace({
        filter,
        data,
        model,
    });
};
export const updateManyNotes = async ({ filter, data }) => {
    return await br.updateMany({
        filter,
        data,
        model,
    });
};

export const deleteNote = async ({ filter }) => {
    return await br.findOneAndDelete({
        filter,
        model: noteModel,
    });
};
export const getPaginatedNotes = async ({ userId, page, limit }) => {
    return await br.findMany({
        filter: { userId },
        model,
        sort: { createdAt: -1 },
        skip: (page - 1) * limit,
        limit,
    });
};

export const getNotesWithUser = async ({ userId }) => {
    return await model
        .find({ userId })
        .select("title userId createdAt")
        .populate({
            path: "userId",
            select: "email",
        });
};

export const aggregateNotes = async ({ filter }) => {
    return await br.aggregate({ model })
        .match({
            ...filter,
            userId: new Types.ObjectId(filter.userId),
        })
        .lookup({
            from: userModel.collection.name,
            localField: "userId",
            foreignField: "_id",
            as: "user",
        })
        .unwind("$user")
        .project({
            title: 1,
            userId: 1,
            createdAt: 1,
            "user.name": 1,
            "user.email": 1,
        });
};
export const deleteAllNotes = async ({ userId }) => {
    return await br.deleteMany({
        filter: { userId },
        model,
    });
};