import React, { useState, useEffect } from 'react';
// import Form from '../components/Form';
import '../styles/Form.css';
import '../styles/UploadPDF.css';
// import UploadPDF from '../components/UploadPDF';
import '../styles/Homepage.css';
// import TransitionsModal from './Modal';

const HomePage = () => {
	const [pdfFiles, setPdfFiles] = useState([]);
	const [pdfFile, setPdfFile] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [filesRating, setFilesRating] = useState([]);
	const [selectedfield, setSelectedfield] = useState('');
	const [fields, setFields] = useState([]);
	const [selectedLanguages, setSelectedLanguages] = useState([]);
	const [maxCandidates, setMaxCandidates] = useState('');
	const [languages, setLanguages] = useState([
		{ id: 1, name: 'JavaScript' },
		{ id: 2, name: 'Python' },
		{ id: 3, name: 'Java' },
		{ id: 4, name: 'C#' },
		{ id: 5, name: 'PHP' },
		{ id: 6, name: 'C++' },
		{ id: 7, name: 'TypeScript' },
		{ id: 8, name: 'Ruby' },
		{ id: 9, name: 'Swift' },
		{ id: 10, name: 'Kotlin' },
		{ id: 11, name: 'Rust' },
		{ id: 12, name: 'Go' },
		{ id: 13, name: 'Scala' },
		{ id: 14, name: 'Perl' },
		{ id: 15, name: 'Dart' },
		{ id: 16, name: 'Elixir' },
		{ id: 17, name: 'Clojure' },
		{ id: 18, name: 'Haskell' },
		{ id: 19, name: 'Lua' },
		{ id: 20, name: 'Julia' },
		{ id: 21, name: 'R' },
		{ id: 22, name: 'Groovy' },
		{ id: 23, name: 'Objective-C' },
	]);

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

	const handleFileInputChange = (e) => {
		const selectedFile = e.target.files[0];
		if (selectedFile) {
			setPdfFile(selectedFile);
		}
	};

	const handleSelectChange = (event) => {
		if (selectedfield.includes(event.target.value)) {
			setSelectedfield(selectedfield.filter((l) => l !== event.target.value));
		} else {
			setSelectedfield(event.target.value);
			setFields([...fields, event.target.value]);
		}
	};

	const handleLanguageChange = (event) => {
		event.preventDefault();
		const language = event.target.value;
		console.log(language);
		if (selectedLanguages.includes(language)) {
			setSelectedLanguages(selectedLanguages.filter((l) => l !== language));
		} else {
			setSelectedLanguages([...selectedLanguages, language]);
		}
	};

	const handleMaxCandidatesChange = (event) => {
		setMaxCandidates(event.target.value);
	}

	useEffect(() => {
		return () => {
			setModalOpen(false);
		};
	}, []);


	const handleUpload = async () => {
		if (pdfFiles.length === 0 && !pdfFile) {
			return;
		}

		setUploading(true);

		const newFilesRating = [];

		for (const file of pdfFiles) {
			const formData = new FormData();


			formData.append('pdf', file);
			formData.append('fields', fields);
			formData.append('selectedLanguages', selectedLanguages);
			formData.append('maxCandidates', maxCandidates);

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
			singleFileFormData.append('fields', fields);
			singleFileFormData.append('selectedLanguages', selectedLanguages);
			singleFileFormData.append('maxCandidates', maxCandidates);

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

	return (
		<div className='homepage'>
			<div className='homepage__left'>
				<div className='homepage__left__title'>Drop your resume here,<br /> Get a job!</div>
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
				</div>
			</div>
			<div className='homepage__right'>
				<div className='homepage__right__title'>Want to Hire?<br /> Give me your requirements!</div>
				<div className='form'>
					{/* <div className='form__title'>Form</div> */}
					<div className='form__content'>
						<div className='form__content__input'>
							<div className='form__content__input__title'>What type of employee are you looking for?</div>
							<select
								className='form__content__input__dropdown'
								value={selectedfield}
								onChange={handleSelectChange}
							>
								<option value='' disabled>Select an option</option>
								<option value='Full Stack Development'>Full Stack Development</option>
								<option value='Backend Development'>Backend Development</option>
								<option value='Frontend Development (UI)'>Frontend Development (UI)</option>
								<option value='Mobile App Development'>Mobile App Development</option>
								<option value='Game Development'>Game Development</option>
								<option value='Automation and Scripting'>Automation and Scripting</option>
								<option value='Object-Oriented Programming'>Object-Oriented Programming</option>
								<option value='Testing'>Testing</option>
							</select>
						</div>
						<div className='form__content__input'>
							<div className='form__content__input__title'>Language proficiency</div>
							<select
								className='form__content__input__dropdown'
								value={selectedLanguages}
								onChange={handleLanguageChange}
							>
								<option value='' disabled>Select an option</option>
								{languages.map((language) => (
									<option value={language.name}>{language.name}</option>
								))}
							</select>
							<ul className='form__content__input__list'>
								{selectedLanguages.map((language, index) => (
									<li className='form__content__input__list__item' key={index} onClick={() => setSelectedLanguages(selectedLanguages.filter((l) => l !== language))}>
										{language}
									</li>
								))}
							</ul>
						</div>
						<div className='form__content__input'>
							<div className='form__content__input__title'>Maximum Candidates to be Shortlisted</div>
							<input type="number" id="maxCandidates" value={maxCandidates} onChange={handleMaxCandidatesChange} />
						</div>
						{/* <div className='form__content__button' onClick={handleSubmit}>
							Submit
						</div> */}
					</div>
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

export default HomePage;
