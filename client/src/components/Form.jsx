import React, { useState } from 'react';
import '../styles/Form.css';

const Form = () => {
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

  const handleSelectChange = (event) => {
    if(selectedfield.includes(event.target.value)){
      setSelectedfield(selectedfield.filter((l) => l !== event.target.value));
    }else{
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

  const handleSubmit = () => {
    if (selectedLanguages.length > 0 && fields.length>0 && maxCandidates !== '') {
      fetch('http://localhost:9000/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields, selectedLanguages, maxCandidates }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Response from backend:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      console.error('No option selected');
        alert('Please select an option');
    }
  };

  return (
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
        <div className='form__content__button' onClick={handleSubmit}>
          Submit
        </div>
      </div>
    </div>
  );
};

export default Form;
