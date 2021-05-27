import React, { useState, useEffect } from 'react';

function UploadMenu({ start, editError, setEditError, buttons, currentPage, setStart, setRender, submitFiles, editStyle, switchEdit, pages }) {

    const [ startStyle, setStartStyle ] = useState({
        background:'#636e72',
        borderColor:'#636e72'
    });

    useEffect(()=>{
        if(currentPage == start) {
            setStartStyle({
                background:'#6ab04c',
                borderColor:'#6ab04c'
            });
        } else {
            setStartStyle({
                background:'#636e72',
                borderColor:'#636e72'
            });
        }
    },[currentPage]);

    return (
        <div className='upload-menu'>
                       <div className='upload-menu-middle'>
                          <button className='upload-back' onClick={
                              ()=>setRender('FORM')
                          }>Back
                          </button>
                          <button onClick={
                              ()=>{
                                  if(pages.length > 0){
                                    setStart(currentPage);
                                    setStartStyle({
                                        background:'#6ab04c',
                                        borderColor:'#6ab04c'
                                    });
                                  } else {
                                    setEditError(<p className='edit-errors'>Please add images</p>); 
                                  }
                              }
                          } style={startStyle} className='upload-start-btn'>START TEST HERE</button>
                          <div onClick={()=>{
                              if(pages.length > 0){
                                switchEdit();
                              } else if(pages.length == 0){
                                setEditError(<p className='edit-errors'>Please add images</p>);
                              }    
                            }} style={editStyle} className='upload-edit-btn'>
                            <div className='edit-svg'></div>
                          </div>
                          <button className='upload-send-btn' onClick={() => {
                                if(pages.length != 0 && buttons > 0 && start >= 0){
                                    submitFiles();
                                } else if(pages.length == 0){
                                    setEditError(<p className='edit-errors'>Please add images</p>); 
                                } else if(buttons == 0){
                                    setEditError(<p className='edit-errors'>You need at least one button</p>); 
                                } else if(start < 0){
                                    setEditError(<p className='edit-errors'>Select the starting page for the test</p>); 
                                }
                          }}>Send</button>
                       </div>
                       {editError}
        </div>
    )
};

export default UploadMenu
