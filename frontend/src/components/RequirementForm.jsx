//Experience years
//Required Languages
//max number of shortlist candidates

import { Grid } from 'antd';
import React, { useState } from 'react';
import './Requirement.css';

const RequirementForm = () => {
  const [experienceYears, setExperienceYears] = useState('');
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

  const handleExperienceChange = (e) => {
    setExperienceYears(e.target.value);
  };

  const handleLanguageChange = (e) => {
    const language = e.target.value;
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const handleMaxCandidatesChange = (e) => {
    setMaxCandidates(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can submit the form data to your backend or perform any other necessary actions.
    console.log('Experience Years:', experienceYears);
    console.log('Selected Languages:', selectedLanguages);
    console.log('Max Candidates:', maxCandidates);
  };

  return (
    <div className="rcontainer">
      <form onSubmit={handleSubmit}>
        <div className='form-control'>
          <div className='col'>
            <label htmlFor="experienceYears">Experience Years:</label>
            <input
              type="text"
              id="experienceYears"
              value={experienceYears}
              onChange={handleExperienceChange}
            />
          </div>
          <div className='col'>
            <label htmlFor="maxCandidates">Max Number of Shortlist Candidates:</label>
            <input
              type="number"
              id="maxCandidates"
              value={maxCandidates}
              onChange={handleMaxCandidatesChange}
            />
          </div>
        </div>
        <div className='form-control row'>
          <label>Required Languages:</label>
          <div className='scrollable-language-list'>
            {languages.map((language) => (
              <div key={language.id}>
                <input
                  type="checkbox"
                  value={language.name}
                  onChange={handleLanguageChange}
                />
                {language.name}
              </div>
            ))}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RequirementForm;