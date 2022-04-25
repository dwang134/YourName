const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err)=> {
    if (err) throw err;

    console.log('DB '+ connection.state);
});

class DbService { 
    static getDbServiceInstance(){
        return instance ? instance : new DbService();
    }

    async getAllData(){
        try{
         const res= await new Promise((resolve, reject)=> {
             const query = "SELECT * FROM names"
             connection.query(query, (err, result)=>{
                 if (err) reject (new Error(err.message));
                 resolve(result);
             })
         })
         return res;
        //  console.log(res);

        }catch (err){
            console.log(err);
        }
    }
}

module.exports = DbService;