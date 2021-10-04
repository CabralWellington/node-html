const mysql = require("mysql2/promise");

var config =
{
    host: '192.168.0.30',
    user: 'Admin',
    password: 'Admin@123',
    database: '_mysql',
    port: 3306,
    ssl: false
};

async function connect(){
    if(global.connection && global.connection.state !== 'disconnected'){
        console.log("MySql Connection Recovered");
        return global.connection;
    }
    const connection = await mysql.createConnection(config);
    console.log("MySql Connection Started");
    global.connection = connection;
    return connection;
}
module.exports = {connect}