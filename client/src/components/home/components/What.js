import React from 'react'

function What() {
    return (
        <div className='home-what-container'>
                         <div className='home-what-middle'>
                            <h1 className='home-what-h1'>What you can do</h1>
                            <div className='home-whats-container'>
                                <div className='home-what-box'>
                                    <h3>Create tests for your products</h3>
                                    <p>Sign up as a developer to be able to upload images of your design and collect input from others in order to improve your user experience.</p>
                                    <div className='home-what-link'>
                                        <div className='home-what-link-a'>Sign Up as Developer</div>
                                        <img draggable='false' className='home-what-svg' src={process.env.PUBLIC_URL + '/imgs/arrow-2.svg'}></img>
                                    </div>
                                </div>

                                <div className='home-what-box'>
                                    <h3>Help others by testing their interfaces</h3>
                                    <p>Sign up as a tester to be able to help others improve the user experience on their websites.</p>
                                    <div className='home-what-link'>
                                        <div className='home-what-link-a'>Sign Up as Tester</div>
                                        <img draggable='false' className='home-what-svg' src={process.env.PUBLIC_URL + '/imgs/arrow-2.svg'}></img>
                                    </div>
                                </div>
                            </div>
                         </div>
        </div>
    )
}

export default What
