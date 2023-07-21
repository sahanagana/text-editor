
//imports from electron
const { BrowserWindow, app, ipcMain, dialog } = require("electron")
//path for renderer and filesystem process
const path = require('path');
const fs = require('fs');
//electron reloader setup
require("electron-reloader")(module);

let mainWindow;

//function that creates a window when the application is opened
const createWindow = () => {
	//window characteristics
	mainWindow = new BrowserWindow({
		autoHideMenuBar: true,
		width: 900,
		height: 700,
		webPreferences : {
			nodeIntegration: true,
			preload: path.join(app.getAppPath(), "renderer.js"),
		},
		contextIsolation: true,
		//sandbox: false,
	})
	
	//automatically open devtools
	mainWindow.webContents.openDevTools();
	//html file to load for window
	mainWindow.loadFile("index.html");

};

//app module controls lifecycle of app
app.whenReady().then(createWindow); //once electron is initialized

//when createdoc button clicked
ipcMain.on("createdoc-trigger", ()=>{
	//ask to save i think?
	dialog.showSaveDialog("mainWindow",
	//options object - can only display text files (for now)
	{
		filters: [{name: "text files", extentions: "txt"}]
	//return promise with then and save file to given path
	}).then(({ filePath }) => {
		fs.writeFile(filePath, "", (error) =>{
			if(error){
				console.log(error);
			}
			else{
				mainWindow.webContents.send("document-created", filePath);
			}
		});
	});
});

//when opendoc button clicked
ipcMain.on("opendoc-trigger", ()=>{
	dialog.showOpenDialog({
		//we only want to use the open file selector
		properties: ["openFile"],
		//change this later to include code?
		filters: [{name: "text files", extentions: "txt"}]
	}).then(({ filePaths }) => {
		//no multiselection
		const filePath = filePaths[0];
		//load content of file
		fs.readFile(filePath, "utf8", (error, content) =>{
			if(error){
				console.log(error);
			}
			else{
				//send info to renderer
				mainWindow.webContents.send("document-opened", {filePath, content})
			}
		})
	})
})
