
//imports from electron
const { BrowserWindow, app } = require("electron")
//path for renderer
const path = require('path');
//electron reloader setup
require("electron-reloader")(module);

let mainWindow;

//function that creates a window when the application is opened
const createWindow = () => {
	//window characteristics
	const mainWindow = new BrowserWindow({
		autoHideMenuBar: true,
		width: 900,
		height: 700,
	})
	
	//automatically open devtools
	mainWindow.webContents.openDevTools();
	//html file to load for window
	mainWindow.loadFile("index.html");

};

//app module controls lifecycle of app
app.whenReady().then(createWindow); //once electron is initialized
