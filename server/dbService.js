const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

db.connect((err)=> {
    if (err) throw err;

    console.log('DB '+ db.state);
});

class DbService { 
    static getDbServiceInstance(){
        return instance ? instance : new DbService();
    }

    async getAllData(){
        try{
         const res= await new Promise((resolve, reject)=> {
             const query = "SELECT * FROM names"
             db.query(query, (err, result)=>{
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

    async insertNewName(name){
        try{
            const dateAdded= new Date();

            const insertID= await new Promise((resolve, reject)=> {
                const query = "INSERT INTO names (name, date_added) VALUES (?,?) ";
                db.query(query, [name, dateAdded], (err, result)=>{
                    if (err) reject (new Error(err.message));
                    resolve(result.insertID);
                })
            })
            return insertID;
           //  console.log(res);

        }catch (err){
            console.log(err);
        }
    }

}

module.exports = DbService;