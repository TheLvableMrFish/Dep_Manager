// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    saveFile: (fileName, content)=> ipcRenderer.send('save-file', fileName, content),
    getFiles: ()=> ipcRenderer.invoke('get-files'),
    loadFile: (fileName)=> ipcRenderer.invoke('load-file', fileName)
})