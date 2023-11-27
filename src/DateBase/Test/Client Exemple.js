let { Client } = require("goupil-database");

async function Start() {
    await Client.start("ws://localhost:8080");
    
    await Client.connect("root", "root");
    
    await Client.newdb("Data/Test");
    
    await Client.save("Data/Test", "Hello World !");
    
    Client.open("Data/Test").then(_ => {
        console.log(_);
    });
}

Start();