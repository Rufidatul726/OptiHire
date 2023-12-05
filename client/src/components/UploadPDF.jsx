import React, { useState, useEffect } from 'react';
import '../styles/UploadPDF.css';
import TransitionsModal from './Modal';

const UploadPDF = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [filesRating, setFilesRating] = useState([]);

  useEffect(() => {
    return () => {
      setModalOpen(false);
    };
  }, []);

  const handleFolderSelect = () => {
    const folderInput = document.getElementById('folderInput');
    if (folderInput) {
      folderInput.click();
    }
  };

  const handleFilesInputChange = (e) => {
    const selectedFiles = e.target.files;
    const pdfFilesInFolder = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      if (file.name.endsWith('.pdf')) {
        pdfFilesInFolder.push(file);
      }
    }

    setPdfFiles(pdfFilesInFolder);
  };

  const handleUpload = async () => {
    if (pdfFiles.length === 0 && !pdfFile) {
      return;
    }

    setUploading(true);

    const newFilesRating = [];

    for (const file of pdfFiles) {
      const formData = new FormData();
      formData.append('pdf', file);

      try {
        const response = await fetch('http://localhost:9000/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          newFilesRating.push({ fileName: file.name, rating: data.rating });
          console.log("fileName:", file.name, "rating: ", data.rating);
          console.log(`File ${file.name} was uploaded successfully.`);
        } else {
          console.error(`File ${file.name} upload failed.`);
        }
      } catch (error) {
        console.error(`File ${file.name} upload failed:`, error);
      }
    }

    // Append the single file
    if (pdfFile) {
      const singleFileFormData = new FormData();
      singleFileFormData.append('pdf', pdfFile);

      try {
        const response = await fetch('http://localhost:9000/upload', {
          method: 'POST',
          body: singleFileFormData,
        });

        if (response.ok) {
          const data = await response.json();
          newFilesRating.push({ fileName: pdfFile.name, rating: data.rating });
          console.log("fileName:", pdfFile.name, "rating: ", data.rating);
          console.log(`Single file was uploaded successfully.`);
        } else {
          console.error(`Single file upload failed.`);
        }
      } catch (error) {
        console.error(`Single file upload failed:`, error);
      }
    }

    setFilesRating(newFilesRating);
    setModalOpen(true);
    setUploading(false);
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setPdfFile(selectedFile);
    }
  };

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
              onChange={handleFileInputChange}
            />
          </div>
        </div>
        <div className='upload__content__button' onClick={handleUpload}>
          Upload
        </div>
      </div>
      {modalOpen && (
        <div className='modal'>
          <h3>Total Rating</h3>
          <table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {filesRating.map((file) => (
                <tr key={file.fileName}>
                  <td>{file.fileName}</td>
                  <td>{file.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UploadPDF;
