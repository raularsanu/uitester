import React from 'react';
import { Link } from 'react-router-dom';

function LocationOne() {
    return (
        <div className='location'>
          <div className='location-middle'>
            <div className='location-button'>
              <Link className='location-link' to='/'>HOME</Link>
            </div>
            <div className='location-button'>
              <span className='location-span'>/</span>
            </div>
            <div className='location-button'>
              <Link to='/dashboard' className='location-link'>DASHBOARD</Link>
            </div>
            <div className='location-button'>
              <span className='location-span'>/</span>
            </div>
            <div className='location-button'>
              <Link className='location-link'>CREATE TEST</Link>
            </div>
          </div>
        </div>
    )
}

export default LocationOne
