import * as br from "./base.repo.js";
import { userModel } from "../db/models/user.model.js";
let model = userModel
export const createUser = async ({ data }) => {
    return await br.create({
        data,
        model
    });
};

export const findUser = async ({ filter }) => {
    return await br.find({
        filter,
        model
    });
};

export const updateUser = async ({filter,data})=>{
  return await br.update({
        filter,
        data,
        model,
    });
}
export const deleteUser = async({filter})=>{

    return await br.remove({
        filter,
        model
    })
}

