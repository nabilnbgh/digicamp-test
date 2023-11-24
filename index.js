const express = require('express');
const app = express();
const sqlite = require('sqlite3');
const connectKnex = require('./database/connectKnex');
const db = require('./database/query');
const bodyParser = require('body-parser');
var cors = require('cors')

app.use(cors());
//create table if not exist
createTableIfNotExist();

app.use(bodyParser.urlencoded({extended :false}));
app.use(bodyParser.json());
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  


// //API routes
// app.post("/task", async (req,res) =>{
//     const data = await db.createTask(req.body);
//     res.status(201).json({id : data[0]});
// });

// app.get("/task", async (_,res) =>{
//     const data = await db.getAllTask();
//     res.status(200).json(data);
// });

// app.put("/task/:id", async (req,res) =>{
//     const id = await db.updateTask(req.params.id, req.body);
//     res.status(200).json({id});
// });

// app.delete("/task/:id", async (req,res) =>{
//     await db.deleteTask(req.params.id);
//     res.status(200).json({success: true});
// });

//start backend
// app.listen(5001, () => console.log('Listening to port 5001'));

function createTableIfNotExist(){
    //open database
    const db = new sqlite.Database('./task.db', sqlite.OPEN_READWRITE, (err) =>{
        if(err) return console.log("error open db", err);
    });

    //create table task if not exist
    var query = 'CREATE TABLE IF NOT EXISTS task(id INTEGER PRIMARY KEY AUTOINCREMENT, title CHAR, description VARCHAR, status TEXT)'
    db.serialize(function(){
        db.run(query, (err) =>{
            if(err) return console.log("error create" + err);
        })
    });
}



showChoise();
readInput();

function showChoise(){
    console.log("Welcome!");
    console.log("Please choose the menu (number only)");
    console.log("1. Read All Task");
    console.log("2. Create A Task");
    console.log("3. Update A Task");
    console.log("4. Delete A Task");
}
function readInput(){
    readline.question('Your Input: ', (choise) => {
        switch (choise) {
            case "1":
                printAllTask();
                break;
            case "2":
                createATask();
                break;
        
            case "3":
                updateATaskStatus();
                break;
            case "4":
                deleteATask();
                break;
            default:
                console.log("Check your input");
                showChoise();
                readInput();
                break;
        }
    });


}


async function printAllTask(){
    const data = await db.getAllTask();
    data.forEach(item => {
        console.log("-------------------");
        console.log("id: ", item.id );
        console.log("title: ", item.title );
        console.log("description: ", item.description );
        console.log("status: ", item.status );
        console.log("-------------------");
        }
    )
    showChoise();
    readInput();
    
}

async function createATask(){
    console.log("-------Isi Data------------");
    let title = "";
    let desc = "";
    let status = "";
    readline.question('title: ', (answer) => {
        title = answer;
        readline.question('description: ', (answer) => {
            desc = answer;
            readline.question('status: ', async (answer) => {
                status = answer;
                const item = await db.createTask({'id': null,"title" : title, "description" : desc, "status" : status});
                console.log("-------Berhasil Ditambahkan------------");
                console.log("id: ", item.id );
                console.log("title: ", item.title );
                console.log("description: ", item.description );
                console.log("status: ", item.status );
                console.log("-------------------");
                showChoise();
                readInput();
            });
        });
    });
    
    
}

async function updateATask(){
    const data = await db.getAllTask();
    data.forEach(item => {
        console.log("-------------------");
        console.log("id: ", item.id );
        console.log("title: ", item.title );
        console.log("description: ", item.description );
        console.log("status: ", item.status );
        console.log("-------------------");
        }
    )
    let id = -1;
    let title = "";
    let desc = "";
    let status = "";
    readline.question('Input Id Task yang akan diubah: ', (answer) => {
        id = answer;
        readline.question('New title: ', (answer) => {
            title = answer;
            readline.question('New description: ', (answer) => {
                desc = answer;
                readline.question('New status: ', async (answer) => {
                    status = answer;
                    const item = await db.updateTask(id,{"title" : title, "description" : desc, "status" : status});
                    console.log("-------Berhasil Diubah------------");
                    showChoise();
                    readInput();
                });
            });
        });
    });
                       
}

async function updateATaskStatus(){
    const data = await db.getAllTask();
    data.forEach(item => {
        console.log("-------------------");
        console.log("id: ", item.id );
        console.log("title: ", item.title );
        console.log("description: ", item.description );
        console.log("status: ", item.status );
        console.log("-------------------");
        }
    )
    let id = -1;
    let title = "";
    let desc = "";
    let status = "";
    readline.question('Input Id Task yang akan diubah: ', (answer) => {
        id = answer;
        readline.question('New status: ', async (answer) => {
            status = answer;
            const item = await db.updateTask(id,{"title" : title, "description" : desc, "status" : status});
            console.log("-------Berhasil Diubah------------");
            showChoise();
            readInput();
        });
    });
                       
}


async function deleteATask(){
    const data = await db.getAllTask();
    data.forEach(item => {
        console.log("-------------------");
        console.log("id: ", item.id );
        console.log("title: ", item.title );
        console.log("description: ", item.description );
        console.log("status: ", item.status );
        console.log("-------------------");
        }
    )
    let id = -1;
    readline.question('Input Id Task yang akan dihapus: ', async (answer) => {
        id = answer;
        const item = await db.deleteTask(id);
        console.log("-------Berhasil Dihapus------------");
        showChoise();
        readInput();    
    });
                       
}