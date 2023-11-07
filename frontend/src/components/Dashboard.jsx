import React, { useState } from 'react';
import RequirementForm from './RequirementForm';

const Dashboard = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFolderSelect = () => {
    const folderInput = document.getElementById('folderInput');
    if (folderInput) {
      folderInput.click();
    }
  };

  const handleFileInputChange = (e) => {
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
    if (pdfFiles.length === 0) {
      return;
    }
  
    setUploading(true);
  
    for (const file of pdfFiles) {
      const formData = new FormData();
      formData.append('pdf', file);
  
      try {
        const response = await fetch('http://localhost:9000/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          console.log(`File ${file.name} was uploaded successfully.`);
        } else {
          console.error(`File ${file.name} upload failed.`);
        }
      } catch (error) {
        console.error(`File ${file.name} upload failed:`, error);
      }
    }
  
    setUploading(false);
  };
  

  return (
    <div>
      <h1>Dashboard</h1>
      <RequirementForm />
      <input
        type="file"
        webkitdirectory="true"
        directory="true"
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
        id="folderInput"
        multiple
        accept=".pdf"
      />
      <button onClick={handleFolderSelect}>Select Folder</button>
      <button onClick={handleUpload} disabled={uploading}>
        Upload PDFs
      </button>

      {uploading && <p>Uploading...</p>}

      {pdfFiles.length > 0 && (
        <div>
          <h2>PDF Files in the Selected Folder:</h2>
          <ul>
            {pdfFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
