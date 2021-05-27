import React,{ useState, useEffect } from 'react';

import Menu from '../Menu';
import Features from './components/Features';
import Promo from './components/Promo';
import What from './components/What';
import How from './components/How';
import Footer from '../Footer';

function Home() {

    const [ slideStyle, setSlideStyle ] = useState({
        transform:'translateX(0%)',
        transition:'.3s'
    });
    const [ slided, setSlided ] = useState(0)
    const [ btnSlideOne, setBtnSlideOne ] = useState({
        background:'#5244CB'
    });
    const [ btnSlideTwo, setBtnSlideTwo ] = useState({
        background:'transparent'
    });

    const slideLeft = () => {
        
            setSlideStyle({
                transform:'translateX(0%)',
                transition:'.3s'
            });
            setBtnSlideOne({
                background:'#5244CB'
            });
            setBtnSlideTwo({
                background:'transparent'
            })
            setSlided(0);
        
    };

    const slideRight = () => {

            setSlideStyle({
                transform:'translateX(-100%)',
                transition:'.3s'
            });
            setBtnSlideOne({
                background:'transparent'
            });
            setBtnSlideTwo({
                background:'#5244CB'
            });
            setSlided(1);
        
    };

    const slideContainer = () => {
        if(slided == 0){
            setSlideStyle({
                transform:'translateX(-100%)',
                transition:'.3s'
            });
            setBtnSlideOne({
                background:'transparent'
            });
            setBtnSlideTwo({
                background:'#5244CB'
            });
            setSlided(1);
        } else if(slided == 1){
            setSlideStyle({
                transform:'translateX(0%)',
                transition:'.3s'
            });
            setBtnSlideOne({
                background:'#5244CB'
            });
            setBtnSlideTwo({
                background:'transparent'
            })
            setSlided(0);
        };
    };

    useEffect(()=>{
 
        setTimeout(slideContainer, 10000);

    },[slided]);

    return (
        <div>
            <Menu />   
                    <div className='home-hero-container'>
                            <div style={slideStyle} className='home-hero-slider'>
                                <div className='home-hero-slide'>
                                    <div className='home-hero'>
                                        <div className='home-hero-left-right'>
                                            <div className='home-hero-left'>
                                                <h1 className='hero-h1'><span>Get feedback</span> on your products and <span>boost your sales</span></h1>
                                                <p className='hero-p'>Post a test and we will let people know to respond to you!</p>
                                                <div className='hero-buttons'>
                                                <button className='hero-register'>Sign Up for Free</button>
                                                <button className='hero-learn'>Find Out More</button>
                                                </div>
                                            </div>
                                            <img draggable='false' className='hero-img' src={process.env.PUBLIC_URL + '/imgs/people.svg'}></img>
                                        </div>
                                    </div>
                                </div>
                                <div className='home-hero-slide'>
                                    <div className='home-hero'>
                                        <div className='home-hero-left-right'>
                                            <div className='home-hero-left'>
                                                <h1 className='hero-h1'><span>Test</span> the mockups of others to help them <span>improve</span></h1>
                                                <p className='hero-p'>Take a test and leave your feedback for the developer!</p>
                                                <div className='hero-buttons'>
                                                <button className='hero-register'>Sign Up for Free</button>
                                                <button className='hero-learn'>Find Out More</button>
                                                </div>
                                            </div>
                                            <img draggable='false' className='hero-img' src={process.env.PUBLIC_URL + '/imgs/home3.svg'}></img>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div className='home-hero-slider-buttons'>
                            <div className='hero-slider-btns'>
                                <button onClick={slideLeft} style={btnSlideOne} className='home-slider-button hero-slider-left'>

                                </button>
                                <button onClick={slideRight} style={btnSlideTwo} className='home-slider-button hero-slider-right'>

                                </button>
                            </div>
                        </div>  
                    </div> 
                    <Features/>
                    <Promo />
                    <What/>
                    <How />
                    <Footer />
        </div>
    )
}

export default Home
