import main

Log = main.Logs()

# The %H, %M and %m variables are inverted compared to node js
Log.setup({
    'pathfile': 'Logs',
    'formatfilename': 'Log %j-%m-%a.log',
    'prefixlog': '[%H:%M %j/%m/%a][%type] '
})

Log.debug("Hello world !")
Log.info("Hello world !")
Log.warning("Hello world !")
Log.error("Hello world !")
Log.critical("Hello world !")