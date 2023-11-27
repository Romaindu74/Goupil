let { Client } = require("goupil-database");

Client.start("localhost:8080");

Client.connect("root", "root");

Client.newdb("Data/Test");

Client.save("Data/Test", "Hello World !");

Client.open("Data/Test").then(_ => {
    console.log(_);
});