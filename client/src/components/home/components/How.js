import React from 'react'

function How() {
    return (
        <div className='home-how-container'>
                        <div className='home-how-middle'>
                           <div className='home-how-box'>
                                <h3>HOW IT WORKS</h3>
                                <h1>How it helps your business succeed</h1>
                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia</p>
                           </div>

                           <div className='home-how-box'>
                                <div className='home-how-bar'></div>
                                <div className='home-how-grid'>
                                    <div className='home-how-step'>
                                       <div className='home-how-circle'>
                                           <div className='home-how-letter'>
                                              1
                                           </div>
                                       </div>
                                       <h3>Uploading</h3>
                                       <p>Developers make a project where they upload images of their mockups , set the flow of the page and then send them to testers.</p>
                                    </div>
                                    <div className='home-how-step'>
                                       <div className='home-how-circle'>
                                           <div className='home-how-letter'>
                                              2
                                           </div>
                                       </div>
                                       <h3>Testing</h3>
                                       <p>Testers will be able to see the mockups and their flow, and based on their experience they will leave a review for the developers.</p>
                                    </div>
                                    <div className='home-how-step'>
                                       <div className='home-how-circle'>
                                           <div className='home-how-letter'>
                                              3
                                           </div>
                                       </div>
                                       <h3>Done!</h3>
                                       <p>After getting the reviews from the testers the developers know what to work on to make the user experience better.</p>
                                    </div>
                                </div>
                           </div>
                        </div>
        </div>
    )
}

export default How
