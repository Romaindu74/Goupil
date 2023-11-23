const { Logs } = require("rpa-logs");

globalThis.Log = new Logs();

Log.setup({
    pathfile: 'Logs',
    formatfilename: 'Log %j-%M-%a.log',
    prefixlog: '[%h:%m %j/%M/%a][%type] '
});

Log.debug("Hello World !");
Log.info("Hello World !");
Log.warning("Hello World !");
Log.error("Hello World !");
Log.critical("Hello World !");