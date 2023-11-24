const knex = require('./connectKnex');

// all CRUD operation using knex connected to sqlite3
function getAllTask(){
    return knex("task").select("*");
}

function createTask(task){
    return knex("task").insert(task);
}

function updateTask(id, task){
    return knex("task").where("id", id).update(task);
}

function deleteTask(id){
    return knex("task").where("id", id).del();
}

module.exports = {
    createTask,
    deleteTask,
    getAllTask,
    updateTask
}

