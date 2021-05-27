import React from 'react'

function Slider({ blobs, changeFiles, setSrc, setCurrentPage }) {
    return (
        <div className='upload-image-slider'>
                      <div className='upload-images'>
                          <input multiple type='file' id='file-images' onChange={changeFiles}></input>
                            <label multiple htmlFor='file-images' className='file-images-label'>
                                <div className='upload-image-btn'>
                                    <div className='upload-image-html-container'>                                       
                                            <img src={process.env.PUBLIC_URL + '/imgs/plus.svg'}></img>
                                            <span>Add image</span>
                                    </div>
                                </div>
                            </label>
                            {blobs.map( (image, index) => {
                                return (
                                    <div onClick={
                                        ()=>{
                                            setSrc(blobs[index]);
                                            setCurrentPage(index);
                                        }
                                    } className='upload-array-image'>
                                        <div className='images-pan'></div>
                                        <img className='upload-array-img' src={image}></img>
                                    </div>
                                )
                            })}
                      </div>
        </div>
    )
}

export default Slider
