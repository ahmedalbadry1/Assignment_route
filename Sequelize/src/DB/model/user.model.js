import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

const checkNameLength = (name) => {
  if (!name || name.length <= 2) {
    throw new Error("invalid user name: must be longer than 2 characters");
  }
};

export let User = sequelize.define('user',
    {
        name :{
            type:DataTypes.STRING(30),
             allowNull: false
            
        },
        email :{
            type:DataTypes.STRING(255),
            unique : true,
            allowNull: false,
            validate:{
                isEmail:true,
                
            }


        },
        password :{
            type:DataTypes.STRING(255),
            allowNull: false,
            validate:{
                checkPasswordLength(value)
                {
                    if(value.length<=6)
                    {
                        throw new Error("too short password" );
                        
                    }
                    

                }
            }


        },
        role:
        {
        type: DataTypes.ENUM('user','admin'),
        defaultValue:"user"
        }

        

},
{
    hooks:
    {
         beforeCreate: (user) => {
        checkNameLength(user.name);
      },
    }
}
    
)

