const config = require('./config.json');
const route = require('./routes/route');
const port = config.server_port;
const host = config.run;
const Hapi = require('hapi');
// var cors = require('cors')
// const db = require("./models");


var server = new Hapi.Server({
    host: host,
    port: port
});

server.route(route);

async function start() {
    // start your server
    try {
        await server.register({
            plugin: require('hapi-cors'),
            options: {
                origins: ['http://localhost:4200']
            }
        });
        await server.start();
        console.log('server started');
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
    console.log('Server running at: ', server.info.uri)
}

start();