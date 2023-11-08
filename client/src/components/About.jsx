import React from 'react'
import '../styles/About.css'

const About = () => {
  return (
    <div className='about'>
        <div className='about__description'>
            <div className='about__description__title'>About Us</div>
            <div className='about__description__content'>
                <p>
                "OPTIHIRE" is a cutting-edge resume screening and shortlisting system 
                designed to streamline the hiring process for companies. 
                By parsing and analyzing diverse resumes, the system matches job requirements, 
                ranks candidates based on their qualifications, and shortlists the most promising candidates, 
                saving time and ensuring the best fit. With advanced natural language processing and scoring algorithms, 
                OPTIHIRE simplifies recruitment, provides efficient candidate selection, 
                and continually adapts to meet evolving recruitment needs.
                </p>
            </div>
        </div>
        <div className='about__team'>
            <div className='about__team__title'>Our Team</div>
            <div className='about__team__content'>
                <div className='about__team__content__member'>
                    <div className='about__team__content__member__name'>Muktadul Islam</div>
                    <div className='about__team__content__member__name'>Rifah Tashfiha Faria</div>
                    <div className='about__team__content__member__name'>Rufidatul Radium</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About