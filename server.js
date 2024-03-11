require('dotonev').config();
const http = require('http');
const app = requre('./index');

const server = http.createServer();
server.listen(process.env.PORT);