 const electron = require('electron');
 const url = require('url');
 const path = require('path');

 const {app, BrowserWindow, Menu} = electron;

let mainWindow;

app.on('ready', function() {
  // create new window
  mainWindow = new BrowserWindow({});

  // load html
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, "mainWindow.html"),
    protocol: "file:",
    slashes: true
  }));

  // build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // insert menu
  Menu.setApplicationMenu(mainMenu);
})

// create menu template
const mainMenuTemplate = [
  {
    role: 'window',
    submenu: [
      {role: 'minimize'},
      {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? "Command+Q" : "Ctrl+Q",
        role: 'close'
      }
    ]
  },
  {
    label: 'File',
    submenu: [
      {label: 'Add Item'},
      {label: 'Clear Items'}
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
    ]
  }
];
