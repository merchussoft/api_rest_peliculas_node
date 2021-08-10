const { Client } = require('node-scp')
const fs =  require('fs');
const path = require('path');

const scpSsh = Client({
   host: process.env.HOST_SSH,
   port: process.env.PORT_SSH,
   username: process.env.USER_SSH,
   privateKey: fs.readFileSync(path.join(__dirname, process.env.PRIVATEKEY_SSH))
});


module.exports = scpSsh;
