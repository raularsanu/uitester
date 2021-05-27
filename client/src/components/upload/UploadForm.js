import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Menu from '../Menu';
import LocationOne from '../LocationOne';
import Footer from '../Footer';

function UploadForm({ setRender, setName, setTask, name, task }) {

    const [ nameError, setNameError ] = useState(<p className='upload-error'></p>);
    const [ taskError, setTaskError ] = useState(<p className='upload-error'></p>);

    const changeName = (e) => {
         setName(e.target.value);
         setNameError(<p className='upload-error'></p>);
    };

    const changeTask = (e) => {
        setTask(e.target.value);
        setTaskError(<p className='upload-error'></p>);
    }

    return (
        <div>
                <Menu/>
                <LocationOne/>
                <div className='upload-form-container'>
                  <h1 className='upload-h1'>Create test</h1>
                    <label htmlFor='upload-name' className='upload-label'>Test name</label>
                    <input value={name} onChange={changeName} id='upload-name' type='text'></input>
                    {nameError}
                    <label htmlFor='upload-name' className='upload-label'>Task</label>
                    <input value={task} onChange={changeTask} id='upload-task' type='text'></input>
                    {taskError}
                    <div className='upload-buttons'>
                        <Link to='/dashboard'><button className='upload-cancel-one'>Cancel</button></Link>
                        <button className='upload-next' onClick={
                            ()=>{
                            if((name != '') && (task != '')){
                                setRender('EDIT')
                            } else if(name == ''){
                                setNameError(<p className='upload-error'>Name cannot be empty</p>);
                            } else if(task == ''){
                                setTaskError(<p className='upload-error'>Task cannot be empty</p>)
                            }
                        }
                        }>Next</button>
                    </div>
                </div>
        </div>
    )
}

export default UploadForm
