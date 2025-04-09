const createBtn = document.getElementById('createBtn')
const input = document.getElementById('dName')
const fileList = document.getElementById('fileList')

let currentEditingFile = null

const loadFiles = async ()=>{
  const files = await window.electronAPI.getFiles()
  fileList.innerHTML = ''

  if(files.length === 0){
    fileList.innerHTML = '<li><i>No files found</i></li>'
  } else {
    files.forEach(file =>{
      const li = document.createElement('li')
      li.textContent = file

      li.onclick = async ()=>{
        const content = await window.electronAPI.loadFile(file)
        input.value = content
        currentEditingFile = file
        createBtn.textContent = 'Update'
      }

      fileList.appendChild(li)
    })
    }
}

createBtn.addEventListener('click', (e)=>{
    e.preventDefault()
  const name = input.value.trim()
  if(!name){
    return
  }

  const fileToSave = currentEditingFile ? currentEditingFile : `${name}`
  window.electronAPI.saveFile(fileToSave, name)

  input.value = ''
  currentEditingFile = null
  createBtn.textContent = 'Save'

  setTimeout(loadFiles, 500)
})

window.addEventListener('DOMContentLoaded', loadFiles)