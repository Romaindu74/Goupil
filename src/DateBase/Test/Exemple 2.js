const { SimpleDataBase } = require("goupil-database");

var port  = 8080;

var Serveur = new SimpleDataBase(port);

Serveur.Start();