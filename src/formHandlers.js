const createBtn = document.getElementById('createBtn')
const input = document.getElementById('dName')
const fileList = document.getElementById('fileList')

const loadFiles = async ()=>{
  const files = await window.electronAPI.getFiles()
  fileList.innerHTML = ''

  if(files.length === 0){
    fileList.innerHTML = '<li><i>No files found</i></li>'
  } else {
    files.forEach(file =>{
      const li = document.createElement('li')
      li.textContent = file
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

  window.electronAPI.saveFile(name)

  input.value = ''

  setTimeout(loadFiles, 500)
})

window.addEventListener('DOMContentLoaded', loadFiles)