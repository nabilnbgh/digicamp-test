const sqlite = require('sqlite3');
const db = require('./database/query');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
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

function showChoise(){
    console.log("Welcome!");
    console.log("Please choose the menu (number only)");
    console.log("1. Read All Task");
    console.log("2. Create A Task");
    console.log("3. Update A Task Status");
    console.log("4. Delete A Task");
    console.log("5. Update A Task");
    console.log("6. Read Task By Status");
    console.log("7. Delete All Task");
    console.log(" ");
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
            case "5":
                updateATask();
                break;
            case "6":
                printTaskByStatus();
                break;
            case "7":
                deleteAllTask();
                break;
            default:
                console.log("-------Invalid Input------------");
                showChoise();
                readInput();
                break;
        }
    });


}

async function printAllTask(){
    const data = await db.getAllTask();
    if(data.length != 0){
        data.forEach(item => printData(item));
    }else{
        console.log("-------No Data------------");
    }
    
    showChoise();
    readInput();
    
}

async function createATask(){
    console.log("-------Fill Detail------------");
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
                console.log("-------Data has been added------------");
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
    readline.question('Input Task ID: ', (answer) => {
        id = answer;
        readline.question('New title: ', (answer) => {
            title = answer;
            readline.question('New description: ', (answer) => {
                desc = answer;
                readline.question('New status: ', async (answer) => {
                    status = answer;
                    const item = await db.updateTask(id,{"title" : title, "description" : desc, "status" : status});
                    if(item == 0){
                        console.log("-------ID Not Found------------");
                    }else{
                        console.log("-------Data Has Been Changed------------");
                    }
                    showChoise();
                    readInput();
                });
            });
        });
    });
                       
}

async function updateATaskStatus(){
    const data = await db.getAllTask();
    data.forEach(item => printData(item));
    let id = -1;
    let status = "";
    readline.question('Input Task ID: ', (answer) => {
        id = answer;
        readline.question('New status: ', async (answer) => {
            status = answer;
            const item = await db.updateTask(id,{"status" : status});
            if(item == 0){
                console.log("-------ID Not Found------------");
            }else{
                console.log("-------Data Has Been Changed------------");
            }
            
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
    readline.question('Input Task ID : ', async (answer) => {
        id = answer;
        const item = await db.deleteTask(id);
        if(item == 0){
            console.log("-------ID Not Found------------");    
        }else{
            console.log("-------Data Has Been Deleted------------");    
        }
        showChoise();
        readInput();    
    });
                       
}

async function printTaskByStatus(){
    readline.question('Input Task Status: ', async (answer) => {
        const item = await db.getTaskByStatus(answer);
        if(item.length == 0){
            console.log("-------No Data Found------------");
        }else{
            item.forEach(it => printData(it));   
        }
        showChoise();
        readInput();    
    });
}

function printData(item){
    console.log("-------------------");
    console.log("id: ", item.id );
    console.log("title: ", item.title );
    console.log("description: ", item.description );
    console.log("status: ", item.status );
    console.log("-------------------");
}

async function deleteAllTask(){    
    readline.question('Are you sure to delete all task? (Y/N) ', async (answer) => {
        if(answer == 'Y' || answer == 'y'){
            const item = await db.deleteAllTask();
            if(item == 0){
                console.log("-------Failed to delete------------");    
            }else{
                console.log("-------All data has been deleted------------");    
            }    
        }else{
            if(answer != 'N' && answer != 'n'){
                console.log("-------Invalid Input------------"); 
            }
        }
        showChoise();
        readInput(); 
    });
                       
}

// main function
createTableIfNotExist();
showChoise();
readInput();