const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

const ON_MAC = process.platform == 'darwin';
process.env.NODE_ENV = "testing";

let mainWindow;
let addWindow;

app.on('ready', function() {
  // create new window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800
  });

  // load html
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, "login.html"),
    protocol: "file:",
    slashes: true
  }));

  // quit app on main window close
  mainWindow.on('closed', function() {
    app.quit()
  });

  // build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // insert menu
  Menu.setApplicationMenu(mainMenu);
})

// handle create add window
function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: "Add Shopping List Item"
  });

  // load html
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, "addWindow.html"),
    protocol: "file:",
    slashes: true
  }));

  // get rid of window in memory when window closed
  addWindow.on('closed', function(){
    addWindow = null;
  })
}

function clearItems() {
  mainWindow.webContents.send('items:clear');
}

// catch item:add
ipcMain.on('item:add', function(event, item) {
  mainWindow.webContents.send('item:add', item);
  addWindow.close();
});

// create menu template
const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add Item',
        click() {
          createAddWindow();
        },
        accelerator: ON_MAC ? "Command+A" : "Ctrl+A"
      },
      {
        label: 'Clear Items',
        click() {
          clearItems();
        },
        accelerator: ON_MAC ? "Command+T" : "Ctrl+T"
      }
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

// returns true if it's the File menu item
function fileMenuItem(element) {
  return element.label === 'File';
}

// if on mac, transfer some File functionality to the Electron menu item
if (ON_MAC) {
  mainMenuTemplate.unshift({
    role: 'window',
    submenu: [
      {role: 'minimize'},
      {
        label: 'Quit',
        accelerator: "Command+Q",
        role: 'close'
      }
    ]
  })
}
// TODO test on non-mac
// if not mac, add closing to the File menu item
else {
  let FileMenuItem = mainMenuTemplate[mainMenuTemplate.findIndex(fileMenuItem)];
  FileMenuItem.submenu.push({role: 'minimize'})
  FileMenuItem.submenu.push({
    label: 'Quit',
    accelerator: "Ctrl+Q",
    role: 'close'
  });
}

if (process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle Developer Tools',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
        accelerator: process.platform == 'darwin' ? "Command+I" : "Ctrl+I"
      },
      {
        role: 'reload',
        accelerator: process.platform == 'darwin' ? "Command+R" : "Ctrl+R"
      }
    ]
  })
}
