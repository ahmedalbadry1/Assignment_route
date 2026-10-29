export const create = async ({ data, model }) => {
    return await model.create(data);
};

export const find = async ({ filter, model }) => {
    return await model.findOne(filter);
};

export const update = async({ filter, data, model })=>{
 return await model.findOneAndUpdate(filter,data, {
    new:true,
    runValidators: true,
 })

}

export const remove = async({filter , model})=>{

   return await model.deleteOne(filter)

}

export const replace = async ({ filter, data, model }) => {
    return await model.replaceOne(filter, data, {
        runValidators: true,
    });
};
export const updateMany = async ({ filter, data, model }) => {
    return await model.updateMany(filter, data, {
        runValidators: true,
    });
};

export const findOneAndDelete = async ({ filter, model }) => {
    return await model.findOneAndDelete(filter);
};

export const findMany = async ({
    filter,
    model,
    sort,
    skip,
    limit,
}) => {
    return await model.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit);
};

export const aggregate = ({ model }) => {
    return model.aggregate();
};

export const deleteMany = async ({ filter, model }) => {
    return await model.deleteMany(filter);
};