import { DataTypes, Model,} from "sequelize";
import { sequelize } from "../connection.js";
import { User } from "./user.model.js";
import { Post } from "./post.model.js";

export class Comment extends Model{}

Comment.init(
{

    content:
    {
        type: DataTypes.TEXT
    },
    userId:
    {
        allowNull:true,
        type:DataTypes.INTEGER,
        references:
        {
            model:User,
            key:"id"
        },
        onDelete:"SET NULL",
        onUpdate:"cascade"

    },
    postId:
    {
           allowNull:false,
        type:DataTypes.INTEGER,
        references:
        {
            model:Post,
            key:"id"
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"

    }

}
,
{
    sequelize,
    modelName:"Comment",
    paranoid:false

})