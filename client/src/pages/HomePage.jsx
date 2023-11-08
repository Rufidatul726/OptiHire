import React from 'react';
import '../styles/Homepage.css';

const HomePage = () => {
  return (
    <div className='homepage'>
      <div className='homepage__left'>
        <div className='homepage__left__title'>Drop your resume here,<br/> Get a job!</div>
      </div>
      <div className='homepage__right'>
        <div className='homepage__right__title'>Want to Hire?<br/> Give me your requirements!</div>
      </div>
    </div>
  );
};

export default HomePage;
