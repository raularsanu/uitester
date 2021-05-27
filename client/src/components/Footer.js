import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className='footer-container'>
            <div className='footer-middle'>
               <div className='footer-logo-container'>
                  <Link to='/'><h3>LOGO</h3></Link>
                  <p>This is just a personal project. No information from the landing page should be taken seriously.</p>
               </div>
               <div className='footer-list'>
                  <h3>INSIDE PROJECT</h3>
                  <p>ABOUT PROJECT</p>
                  <p>CONTACT</p>
                  <p>GIT FILES</p>
               </div>
               <div className='footer-list footer-list-two'>
                  <h3>CONTACT DEVELOPER</h3>
                  <p>LINKEDIN</p>
               </div>
            </div>
        </div>
    )
}

export default Footer
