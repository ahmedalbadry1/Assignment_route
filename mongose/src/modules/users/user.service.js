
import * as ur from "../../repo/users.repo.js"


export let signup = async (body) =>{
    let userExists = await ur.findUser({
        filter: { email: body.email },
    })
    if (userExists) {
        throw new Error("Email already exists", { cause: 409 });
    }

    return await ur.createUser({
        data : body
    })

}

export let signin= async (body)=>{
     const user = await ur.findUser({
        filter: { email: body.email },
    });

    if (!user || user.password !== body.password) {
        throw new Error("Invalid email or password", { cause: 401 });
    }
    return user 

}

export const update = async (userId, body) => {
    if (!userId) {
        throw new Error("User ID is required", { cause: 400 });
    }

    const user = await ur.findUser({
        filter: { _id: userId },
    });

    if (!user) {
        throw new Error("User not found", { cause: 404 });
    }

    if (body.email !== undefined) {
        const emailExists = await ur.findUser({
            filter: {
                email: body.email,
                _id: { $ne: userId },
            },
        });

        if (emailExists) {
            throw new Error("Email already exists", { cause: 409 });
        }
    }

    const data = {};

    for (const field of ["name", "email", "phone", "age"]) {
        if (body[field] !== undefined) {
            data[field] = body[field];
        }
    }

    return await ur.updateUser({
        filter: { _id: userId },
        data,
    });
};

export const deleteUser = async(id)=>{
   if (!id) {
        throw new Error("User ID is required", { cause: 400 });
    }
   
      const result = await ur.deleteUser({
        filter: { _id: id },
    });

    if (result.deletedCount === 0) {
        throw new Error("User not found", { cause: 404 });
    }

    return result;
}
export const getUser = async (id) => {
    if (!id) {
        throw new Error("User ID is required", { cause: 400 });
    }

    const user = await ur.findUser({
        filter: { _id: id },
    });

    if (!user) {
        throw new Error("User not found", { cause: 404 });
    }

    return user;
};