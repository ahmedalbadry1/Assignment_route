import { authorsModel } from "../../DB/models/index.js";

export const createAuthor = async (body) => {
    return await authorsModel.insertOne(body);
};