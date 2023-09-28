const app = require('./app');
const db = require("./config.db.js")


const port = 8085;


app.listen(port, ()=>{
console.log ("Server Listening on Port http://localhost:"+port);});