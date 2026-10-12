import { DataTypes, Model,} from "sequelize";
import { sequelize } from "../connection.js";
import { User } from "./user.model.js";

export class Post extends Model{}

Post.init(
{
title:
    {
        type: DataTypes.STRING(255),
        allowNull:true
    },
    content:
    {
        type: DataTypes.TEXT
    },
    userId:
    {
        allowNull:false,
        type:DataTypes.INTEGER,
        references:
        {
            model:User,
            key:"id"
        },
        onDelete:"cascade",
        onUpdate:"cascade"

    }

}
,
{
    sequelize,
    modelName:"Post",
    paranoid:true

})