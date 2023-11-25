const knex = require('./connectKnex');

// all CRUD operation using knex connected to sqlite3
function getAllTask(){
    return knex("task").select("*");
}
function getTaskByStatus(status){
    return knex("task").select("*").where("status", 'like', `%${status}%`);
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
function deleteAllTask(){
    return knex("task").del();
}
module.exports = {
    createTask,
    deleteTask,
    deleteAllTask,
    getAllTask,
    getTaskByStatus,
    updateTask
}

