
//imports from electron
const { BrowserWindow, app } = require("electron")

//electron reloader setup
require("electron-reloader")(module);

//function that creates a window when the application is opened
const createWindow = () => {

	//window characteristics
	const mainWindow = new BrowserWindow({
		width: 900,
		height: 700
	})
	
	//automatically open devtools
	mainWindow.webContents.openDevTools();
	//html file to load for window
	mainWindow.loadFile("index.html");
};

//app module controls lifecycle of app
app.whenReady().then(createWindow); //once electron is initialized
