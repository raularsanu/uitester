import React,{ useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import UploadEdit from './UploadEdit';
import UploadForm from './UploadForm';

function Upload({ id, history }) {

    const [ render, setRender ] = useState('FORM');

    const [ name, setName ] = useState('');
    const [ task, setTask ] = useState('');
    const [ pages, setPages ] = useState([]);
    const [ start, setStart ] = useState(-1);

    const showUpload = () => {
        if( render === 'FORM' ){
            return (
             <UploadForm setRender={setRender} setName={setName} setTask={setTask} name={name} task={task} />
            )
        } else if( render === 'EDIT' ){
            return (
             <UploadEdit start={start} setStart={setStart} pages={pages} setPages={setPages} setRender={setRender} name={name} task={task} />
            )
        }
    }

    const changeRender = () => {
        if(!id){
            return (
                <Redirect to='/' />
            )
        } else {
            return (
              <div>
                <div className='upload-unseen'>
                <input type='text' value={name}></input>
                <input type='text' value={task}></input>
                </div>
                {showUpload()}
              </div>
            )
        }
    }

    return (
        <div>
            {changeRender()}
        </div>
    )
}

const mapStateToProps = ({ user }) => {

    const { id } = user;

    return {
        id
    }
};

export default connect(mapStateToProps)(Upload);
