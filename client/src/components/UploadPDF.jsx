import React , { useState } from 'react';
import '../styles/UploadPDF.css'

const UploadPDF = () => {
  const [pdfFiles, setPdfFiles] = useState([])
  const [pdfFile, setPdfFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const handleFolderSelect = () => {
    const folderInput = document.getElementById('folderInput')
    if (folderInput) {
      folderInput.click()
    }
  }

  const handleFilesInputChange = (e) => {
    const selectedFiles = e.target.files
    const pdfFilesInFolder = []

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i]

      if (file.name.endsWith('.pdf')) {
        pdfFilesInFolder.push(file)
      }
    }

    setPdfFiles(pdfFilesInFolder)
  }

  const handleUpload = async () => {
    if (pdfFiles.length === 0) {
      return
    }
  
    setUploading(true)
  
    for (const file of pdfFiles) {
      const formData = new FormData()
      formData.append('pdf', file)
  
      try {
        const response = await fetch('http://localhost:9000/upload', {
          method: 'POST',
          body: formData,
        })
  
        if (response.ok) {
          console.log(`File ${file.name} was uploaded successfully.`)
        } else {
          console.error(`File ${file.name} upload failed.`)
        }
      } catch (error) {
        console.error(`File ${file.name} upload failed:`, error)
      }
    }
  
    setUploading(false)
  }

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setPdfFile(selectedFile)
    }
  }

  const handleFileSelect = () => {
    const fileInput = document.getElementById('fileInput')
    console.log(fileInput)
  }

  return (
    <div className='upload'>
      <div className='upload__title'>Upload PDF</div>
      <div className='upload__content'>
        <div className='upload__content__input'>
          <div className='upload__content__input__type__folder'>
            <div className='upload__content__input__title'>Select a folder</div>
            <input
              id='folderInput'
              type='file'
              webkitdirectory=''
              directory=''
              // style={{ display: 'none' }}
              onChange={handleFilesInputChange}
            />
            <div className='upload__content__input__button' onClick={handleFolderSelect}>
              Select
            </div>
          </div>
          <div className='upload__content__input__type__file'>
            <div className='upload__content__input__title'>Select a file</div>
            <input
              id='fileInput'
              type='file'
              // style={{ display: 'none' }}
              onChange={handleFileInputChange}
            />
            {/* <div className='upload__content__input__button' onClick={handleFileSelect}>
              Select
            </div> */}
          </div>
        </div>
        <div className='upload__content__button' onClick={handleUpload}>
          Upload
        </div>
      </div>
    </div>
  )
}

export default UploadPDF