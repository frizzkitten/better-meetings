 const electron = require('electron');
 const url = require('url');
 const path = require('path');

 const {app, Browser} = electron;

let mainWindow;

app.on('ready', function() {
  // create new window
  mainWindow = new BrowserWindow({});
})
