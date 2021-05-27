import React from 'react'

function Promo() {
    return (
        <div className='home-promo-container'>
                        <div className='home-promo-middle'>
                           <img draggable='false' className='promo-svg' src={process.env.PUBLIC_URL + '/imgs/add.svg'}></img>
                           <div className='promo-info-container'>
                                <div className='promo-info'>
                                   <h3><span>Quick</span> & <span>Easy</span> Process</h3>
                                   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do .
                                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do consectetur adipiscing elit, sed do </p>
                                   <button>Try it out!</button>
                                </div>
                           </div>
                        </div>
        </div>
    )
}

export default Promo
