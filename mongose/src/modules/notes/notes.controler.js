import { Router } from "express";
import * as note from "./notes.service.js" 

export let noteRouter = Router()

noteRouter.post("/", async (req, res, next) => {
    await note.createNote(req.query.id, req.body);
    
    return res.status(201).json({
        message: "Note created",
    });
});


noteRouter.patch("/all", async (req, res, next) => {
    await note.updateAllTitles(req.query.id, req.body);

    return res.status(200).json({
        message: "All notes updated",
    });
});
noteRouter.patch("/:noteId", async (req, res, next) => {
    const updatedNote = await note.updateNote(
        req.params.noteId,
        req.query.id,
        req.body
    );

    return res.status(200).json({
        message: "Updated",
        note: updatedNote,
    });
});

noteRouter.put("/replace/:noteId", async (req, res, next) => {
    const replacedNote = await note.replaceNote(
        req.params.noteId,
        req.query.id,
        req.body
    );

    return res.status(200).json(replacedNote);
});

noteRouter.delete("/:noteId", async (req, res, next) => {
    const deletedNote = await note.deleteNote(
        req.params.noteId,
        req.query.id
    );

    return res.status(200).json({
        message: "Deleted",
        note: deletedNote,
    });
});

noteRouter.get("/paginate-sort", async (req, res, next) => {
    const notes = await note.getPaginatedNotes(
        req.query.id,
        req.query
    );

    return res.status(200).json(notes);
});
noteRouter.get("/note-by-content", async (req, res, next) => {
    const foundNote = await note.getNoteByContent(
        req.query.id,
        req.query.content
    );
    
    return res.status(200).json(foundNote);
});
noteRouter.get("/note-with-user", async (req, res, next) => {
    const notes = await note.getNotesWithUser(req.query.id);

    return res.status(200).json(notes);
});
noteRouter.get("/aggregate", async (req, res, next) => {
    const notes = await note.aggregateNotes(
        req.query.id,
        req.query.title
    );

    return res.status(200).json(notes);
});
noteRouter.get("/:noteId", async (req, res, next) => {
    const foundNote = await note.getNote(
        req.params.noteId,
        req.query.id
    );

    return res.status(200).json(foundNote);
});

noteRouter.delete("/", async (req, res, next) => {
    await note.deleteAllNotes(req.query.id);

    return res.status(200).json({
        message: "Deleted",
    });
});

