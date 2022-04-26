//model
const express= require('express');
const app = express();
const cors = require('cors'); //allows request from our web to another web
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService')

app.use(cors()); //not block incoming api call and send it to backend
app.use(express.json()); //send json data for POST/PUT later
app.use(express.urlencoded({extended: false})); //recognize inc obj as string/array

//create
app.post('/insert', (req, res) => {
    const {name} = req.body;
    const db = dbService.getDbServiceInstance();

    const result= db.insertNewName(name)
    result.then(data=> res.json({data: data})).catch(err => console.log(err));
    // console.log(req.body);
});

//read
app.get('/getAll', (req, res) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData();

    result.then(data=> res.json({data: data})).catch(err => console.log(err));
    
    // res.json({
    //     success: true
    // });
    // console.log('get request made');
});


//update
app.patch('/update', (req, res) => {
    const {id, name } = req.body;
    const db= dbService.getDbServiceInstance();
    const result = db.updateNameById(id, name);
    result.then(data=> res.json({success: data})).catch(err => console.log(err));
})

//delete
app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    const db = dbService.getDbServiceInstance();
    const result = db.deleteRowById(id);

    result.then(data=> res.json({success: data})).catch(err => console.log(err));
})


//get data by name
app.get('/search/:name' , (req, res) => {
    const {name} = req.params;
    const db= dbService.getDbServiceInstance();
    const result = db.searchByName(name);

    result.then(data=> res.json({data: data})).catch(err => console.log(err));
    
})



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})