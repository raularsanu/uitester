import React from 'react';
import { Link } from 'react-router-dom';

function LocationTwo() {
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
              <Link className='location-link'>DASHBOARD</Link>
            </div>
          </div>
        </div>
    )
}

export default LocationTwo
