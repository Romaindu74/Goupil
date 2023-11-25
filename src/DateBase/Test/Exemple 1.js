const fs = require("fs");

const { DataBase } = require("goupil-database");

var options_http = {};

var http_key_file = `${path}/common/Http/key.key`;
if (fs.existsSync(http_key_file)) {
    options_http.key = fs.readFileSync(http_key_file);
}

var http_crt_file = `${path}/common/Http/certificat.crt`;
if (fs.existsSync(http_crt_file)) {
    options_http.cert = fs.readFileSync(http_crt_file);
}

var http = new DataBase.http(
    options_http,
    (req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<style>*{font-family: system-ui;}html{background-color:#343541;}a{text-decoration:none;color:white;}h1{text-align:center;}</style><a href="https://github.com/Romaindu74/Goupil"><h1>Simple DataBase</h1></a><br><h2>Hello World !</h2>');
    }
)

function http_start(port) {
    http.start(port).then(_ => {
        Log.info(`The HTTP server started on port ${port}.`)
    }).catch(_ => {
        if (_.code === 'EADDRINUSE') {
            Log.error(`Port ${port} is already in use. Next attempt in ${Math.floor(t/1000)}s.`);
            setTimeout(_ => { http_start(port, t) }, t);
        }
    });
}

var port = 8080;

http_start(port);

var WebSocket_Server = new DataBase.wss({ server: http.server });

DataBase.main(http, WebSocket_Server);
