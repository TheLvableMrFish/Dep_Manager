const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const fs = require('fs')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true
    },
  });

  // and load the index.html of the app.
  mainWindow.setMenu(null)
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.on('save-file', (event, fileName)=>{
  const filePath = path.join(__dirname, `${fileName}.txt`)
  fs.writeFile(filePath, 'Generate file', (err)=>{
    if(err){
      console.log('Error saving file', err)
    } else {
      console.log(`File saved as: ${filePath}`)
    }
  })
})

ipcMain.handle('get-files', async ()=>{
  try{
    const files = await fs.promises.readdir(filesDir)
    return files
  } catch(err){
    console.log('Error reading files:', err)
    return []
  }
})