import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { emptyTest } from '../../redux/actions';

function Test({ test, emptyTest }) {

    const [ feedback, setFeedback ] = useState('');
    const [ err, setErr ] = useState(<p className='error-test'></p>)

    const [ loader, setLoader ] = useState({
        display:'block'
    });
    const [ taskMenu, setTaskMenu ] = useState({
        display:'none'
    });
    const [ finishStyle, setFinishStyle ] = useState({
        display:'none'
    })

    const [ clicked, setClicked ] = useState(0);

    const [ src, setSrc ] = useState('');
    const [ button, setButton ] = useState({});
    const [ next, setNext ] = useState();
    const [ testTask, setTestTask ] = useState('');

    useEffect(() => {

        if(test.pages === undefined){
            return 
        } else {
            setSrc('https://quiet-inlet-46335.herokuapp.com/images/' + test.pages[test.start].src);
            setButton({
                top: test.pages[test.start].button.top + '%',
                left: test.pages[test.start].button.left + '%',
                height: test.pages[test.start].button.height + '%',
                width: test.pages[test.start].button.width + '%'
            });
            setNext(test.pages[test.start].button.next);
            setTestTask(test.task);
        };

    }, [test]);

    const finishTest = () => {
        if(( clicked ) == test.buttons){
            setFinishStyle({
                display:'block'
            });
        };
    };

    const changeFeedback = (e) => {
        setFeedback(e.target.value);
        setErr(<p className='error-test'></p>);
    }

    const postFeedback = async () => {

        const data = {
            feedback,
            id: test._id
        };

        console.log(data.id);

        const res = await axios.post('/update-test', data);

        window.location = '/';
    };

    const checkSubmit = () => {
        if(feedback === ''){
          setErr(<p className='error-test'>Please write a review</p>);
        } else {
            setLoader({
                display:'block'
            });
            postFeedback();
        }
    }

    return (
      <div>
        <div style={loader} className='auth-loading'>
                            <svg className='loading-circle-svg' height="100" width="100">
                            <circle className='loading-circle' cx="50" cy="50" r="40" fill="transparent" />
                            </svg>
        </div>
        <div style={finishStyle} className='test-finish-container'>
            <div className='test-finish-input-container'>
               <h1>Test completed!</h1>
               <p className='test-finish-input-container-p'>Please give the devloper you thoughts :</p>
               <textarea onChange={changeFeedback} value={feedback}></textarea>
               {err}
               <button onClick={checkSubmit}>Send</button>
            </div>
        </div>
        <div style={taskMenu} className='test-task-container'>
                <div className='test-task-container-middle'>
                  <div className='test-task-up-container'>
                     <h3 className='test-h3'>Task</h3>
                     <Link onClick={
                         ()=>emptyTest()
                     } to='/'><button className='test-task-button'>Stop test here</button></Link>
                  </div>
                  <p className='test-task'>{testTask}</p>
                   
                </div>
        </div>
        <div className='test-container'>
            <img onLoad={()=>{
                setLoader({
                    display:'none'
                });
                setTaskMenu({
                display:'block'
                });
                finishTest();
            }} src={src}></img>
            <button className='test-target-button' onClick={()=>{
                setSrc('https://quiet-inlet-46335.herokuapp.com/images/' + test.pages[next].src);
                setClicked(clicked => clicked + 1);
                setLoader({
                    display:'block'
                });
                if(test.pages[next].button != undefined){
                    setButton({
                        top: test.pages[next].button.top + '%',
                        left: test.pages[next].button.left + '%',
                        height: test.pages[next].button.height + '%',
                        width: test.pages[next].button.width + '%'
                    });
                    setNext(test.pages[next].button.next);
                } else {
                    setButton({
                        top: 0 + '%',
                        left: 0 + '%',
                        height: 0 + '%',
                        width: 0 + '%'
                    }); 
                }
            }} style={button}></button>
        </div>
      </div>
    )
};

const mapStateToProps = ({ test }) => {
    return {
       test
    };
};

export default connect(mapStateToProps, { emptyTest })(Test);
