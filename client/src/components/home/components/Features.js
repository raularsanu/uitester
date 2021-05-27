import React from 'react'

function Features() {
    return (
        <div className='home-features-container'>
                         <div className='home-features-middle'>
                           <div className='home-feature'>
                              <div className='home-feature-svg-container'>
                                <img className='feature-svg' src={process.env.PUBLIC_URL + '/imgs/pc2.svg'}></img>
                              </div>
                              <h3>Easy to Use</h3>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do .</p>
                           </div>
                           <div className='home-feature'>
                              <div className='home-feature-svg-container'>
                                <img className='feature-svg' src={process.env.PUBLIC_URL + '/imgs/time2.svg'}></img>
                              </div>
                              <h3>Daily Reports</h3>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do .</p>
                           </div>
                           <div className='home-feature'>
                              <div className='home-feature-svg-container'>
                                <img className='feature-svg' src={process.env.PUBLIC_URL + '/imgs/shield2.svg'}></img>
                              </div>
                              <h3>Fully Secured</h3>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do .</p>
                           </div>
                         </div>
        </div>
    )
}

export default Features
