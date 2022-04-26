//model
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

            const insertId= await new Promise((resolve, reject)=> {
                const query = "INSERT INTO names (name, date_added) VALUES (?,?);";
                db.query(query, [name, dateAdded], (err, result)=>{
                    if (err) reject (new Error(err.message));
                    resolve(result.insertId);
                })
            });

            return {
                id: insertId,
                name: name,
                dateAdded: dateAdded
            };
           //  console.log(res);

        }catch (err){
            console.log(err);
        }
    }

    async deleteRowById(id){

        try{
            id = parseInt(id, 10);
            const response= await new Promise((resolve, reject)=> {
                const query = "DELETE FROM names WHERE id= ?";
                db.query(query, [id], (err, result)=>{
                    if (err) reject (new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            return response === 1 ? true : false;
            
        }catch(err){
            console.log(err);
            return false;
        }
        
    }

    //update
    async updateNameById(id, name){
        try{
            id = parseInt(id, 10);
            console.log(id);
            const response= await new Promise((resolve, reject)=> {
                const query = "UPDATE names SET name = ? WHERE id= ?";
                db.query(query, [name, id], (err, result)=>{
                    if (err) reject (new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            return response === 1 ? true: false;
            
        }catch(err){
            console.log(err);
            return false;
        }
    }

    //get data by id
    async searchByName(name){
        try{
            const res= await new Promise((resolve, reject)=> {
                const query = "SELECT * FROM names WHERE name= ?"
                db.query(query, [name], (err, result)=>{
                    if (err) reject (new Error(err.message));
                    resolve(result);
                })
            })
            return res;
   
           }catch (err){
               console.log(err);
           }
    } 
    
} //class ends here

module.exports = DbService;