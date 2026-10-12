import { Sequelize } from 'sequelize';
import { DB_DIALECT, DB_HOST ,DB_NAME,DB_PASS,DB_USER } from '../config/config.service.js';

export let sequelize = new Sequelize(DB_NAME,DB_USER,DB_PASS,{
    host:DB_HOST,
    dialect:DB_DIALECT,
    pool:{
        max:10,
        min:1

    }
})

export const connection = async ()=>
{
    try{
        await sequelize.authenticate()
        await sequelize.sync({force:false,alter:false})
        console.log('Connection has been established successfully.');


    }catch(err)
    {
         console.error('Unable to connect to the database:', err);
         process.exit(1)

    }


}