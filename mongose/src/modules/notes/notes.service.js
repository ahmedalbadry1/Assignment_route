import * as nr from "../../repo/notes.repo.js";
import * as ur from "../../repo/users.repo.js";
import { isObjectIdOrHexString } from "mongoose";

export const createNote = async (userId, body) => {
    if (!isObjectIdOrHexString(userId)) {
        throw new Error("Invalid user ID", { cause: 400 });
    }

    const user = await ur.findUser({
        filter: { _id: userId },
    });

    if (!user) {
        throw new Error("User not found", { cause: 404 });
    }

    return await nr.createNote({
        data: {
            title: body.title,
            content: body.content,
            userId,
        },
    });
};

export const updateNote = async (noteId, userId, body) => {
    if (
        !isObjectIdOrHexString(noteId) ||
        !isObjectIdOrHexString(userId)
    ) {
        throw new Error("Invalid note or user ID", { cause: 400 });
    }

    const note = await nr.findNote({
        filter: { _id: noteId },
    });

    if (!note) {
        throw new Error("Note not found", { cause: 404 });
    }

    if (note.userId.toString() !== userId) {
        throw new Error("You are not the owner", { cause: 403 });
    }

    const data = {};

    for (const field of ["title", "content"]) {
        if (body[field] !== undefined) {
            data[field] = body[field];
        }
    }

    return await nr.updateNote({
        filter: { _id: noteId, userId },
        data,
    });
};

export const replaceNote = async (noteId, userId, body) => {
    if (
        !isObjectIdOrHexString(noteId) ||
        !isObjectIdOrHexString(userId)
    ) {
        throw new Error("Invalid note or user ID", { cause: 400 });
    }

    const note = await nr.findNote({
        filter: { _id: noteId },
    });

    if (!note) {
        throw new Error("Note not found", { cause: 404 });
    }

    if (note.userId.toString() !== userId) {
        throw new Error("You are not the owner", { cause: 403 });
    }

    const result = await nr.replaceNote({
        filter: { _id: noteId, userId },
        data: {
            title: body.title,
            content: body.content,
            userId: note.userId,
            createdAt: note.createdAt,
        },
    });

    if (result.matchedCount === 0) {
        throw new Error("Note not found", { cause: 404 });
    }

    return await nr.findNote({
        filter: { _id: noteId, userId },
    });
};
export const updateAllTitles = async (userId, body) => {
    if (!isObjectIdOrHexString(userId)) {
        throw new Error("Invalid user ID", { cause: 400 });
    }

    if (body.title === undefined) {
        throw new Error("Title is required", { cause: 400 });
    }

    const result = await nr.updateManyNotes({
        filter: { userId },
        data: { title: body.title },
    });

    if (result.matchedCount === 0) {
        throw new Error("No note found", { cause: 404 });
    }

    return result;
};
export const deleteNote = async (noteId, userId) => {
    if (
        !isObjectIdOrHexString(noteId) ||
        !isObjectIdOrHexString(userId)
    ) {
        throw new Error("Invalid note or user ID", { cause: 400 });
    }

    const note = await nr.findNote({
        filter: { _id: noteId },
    });

    if (!note) {
        throw new Error("Note not found", { cause: 404 });
    }

    if (note.userId.toString() !== userId) {
        throw new Error("You are not the owner", { cause: 403 });
    }

    const deletedNote = await nr.deleteNote({
        filter: { _id: noteId, userId },
    });

    if (!deletedNote) {
        throw new Error("Note not found", { cause: 404 });
    }

    return deletedNote;
};

export const getPaginatedNotes = async (userId, query) => {
    if (!isObjectIdOrHexString(userId)) {
        throw new Error("Invalid user ID", { cause: 400 });
    }

    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);

    if (
        !Number.isInteger(page) || page < 1 ||
        !Number.isInteger(limit) || limit < 1
    ) {
        throw new Error("Page and limit must be positive integers", {
            cause: 400,
        });
    }

    return await nr.getPaginatedNotes({
        userId,
        page,
        limit,
    });
};
export const getNote = async (noteId, userId) => {
    if (
        !isObjectIdOrHexString(noteId) ||
        !isObjectIdOrHexString(userId)
    ) {
        throw new Error("Invalid note or user ID", { cause: 400 });
    }

    const note = await nr.findNote({
        filter: { _id: noteId },
    });

    if (!note) {
        throw new Error("Note not found", { cause: 404 });
    }

    if (note.userId.toString() !== userId) {
        throw new Error("You are not the owner", { cause: 403 });
    }

    return note;
};

export const getNoteByContent = async (userId, content) => {
    if (!isObjectIdOrHexString(userId)) {
        throw new Error("Invalid user ID", { cause: 400 });
    }

    if (typeof content !== "string" || content.trim() === "") {
        throw new Error("Content is required", { cause: 400 });
    }

    const note = await nr.findNote({
        filter: {
            userId,
            content,
        },
    });

    if (!note) {
        throw new Error("No note found", { cause: 404 });
    }

    return note;
};

export const getNotesWithUser = async (userId) => {
    if (!isObjectIdOrHexString(userId)) {
        throw new Error("Invalid user ID", { cause: 400 });
    }

    return await nr.getNotesWithUser({ userId });
};

export const aggregateNotes = async (userId, title) => {
    const filter = { userId };

    if (title !== undefined) {
        filter.title = title;
    }

     const notes = await nr.aggregateNotes({ filter });

    if (notes.length === 0) {
        throw new Error("No notes found", { cause: 404 });
    }

    return notes;
};

export const deleteAllNotes = async (userId) => {
    if (!userId) {
        throw new Error("User ID is required", { cause: 400 });
    }

    return await nr.deleteAllNotes({ userId });
};
