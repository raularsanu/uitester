import React,{ useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Slider from './components/Slider';
import UploadMenu from './components/UploadMenu';

function UploadEdit({ history, start, setStart, setRender, id, tests, name, task, pages, setPages }) {

    const [ loader, setLoader ] = useState({
            display:'none'
    });

    const [ editError, setEditError ] = useState();

    const [ editable, setEditable ] = useState(false);

    const [ buttons, setButtons ] = useState(0);

    const [ files, setFiles ] = useState([]);

    const [ blobs, setBlobs ] = useState([]);

    const [ src, setSrc ] = useState('');

    const [ clientNames, setClientNames ] = useState([]);

    const [ currentPage, setCurrentPage ] = useState(0);

    const [ targetClient, setTargetClient ] = useState('');
    const [ target, setTarget ] = useState('');

    const [ optionsStyle, setOptionsStyle ] = useState({
        display:'none'
    });
    const [ listStyle, setListStyle ] = useState({
        display:'none'
    });

    const [ width, setWidth ] = useState();
    const [ height, setHeight ] = useState();
    const [ top, setTop ] = useState();
    const [ left, setLeft ] = useState();

    const [ editStyle, setEditStyle ] = useState({
        background:'black',
        border:'2px solid rgba(255,255,255,0.3)'
    });

    const [ selectStyle, setSelectStyle ] = useState({});

    const saveButton = () => {
        let newPages = pages;
        let newPage = pages[currentPage];

        const button = {
            top,
            left,
            height,
            width,
            next:target
        };

        newPage = {...newPage, button};
        newPages[currentPage] = newPage;
        setPages(newPages);

        setTop();
        setLeft();
        setHeight();
        setWidth();
        setOptionsStyle({
            display:'none'
        });
        setSelectStyle({
            top:0,
            left:0,
            width:0,
            height:0
        });
        setButtons(buttons => buttons + 1);
        setEditError();
    };

    const changeFiles = (e) => {
        // Files for server
        setFiles(e.target.files);

        //Files for client
        if(pages.length == 0) {
            setEditError();
        } 

        const data = [];
        const clNames = [];
        const newPages = [];
        for( let i = 0; i < e.target.files.length ; i++ ){
            data.push(URL.createObjectURL(e.target.files[i]));

            const svName = id + '_' + tests + '_' + e.target.files[i].name;
            const clName = e.target.files[i].name;
            const newPage = {
                src: svName,
                start: false
            };
            
            clNames.push(clName);
            newPages.push(newPage);
        }
        setClientNames(clNames);
        setPages(newPages);
        setTargetClient(clNames[1]);
        setTarget(1);
        setBlobs(data);
        setSrc(data[0]);
    };

    const retrunImage = () => {
        if(blobs.length > 0){
             return (
               <img draggable='false' src={src} className='upload-main-img'></img>
             )
        }
        else return (
            <div className='upload-main-img'>
                <h1 className='no-image-message'>No Image Selected</h1>
            </div>
        )
    }

    const submitFiles = async () => {
        const formData = new FormData();
        for( let i = 0; i < files.length; i++ ){
            formData.append('file',files[i]);
        };
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        const testData = {
             user: id,
             name,
             task,
             pages,
             start,
             buttons
        }

        setLoader({
            display:'block'
        });

        const res1 = await axios.post('/upload-file', formData, config);

        const res2 = await axios.post('/upload-test', testData);

        window.location = '/'
    };

    const switchEdit = () => {
          if(blobs.length > 0 && editable == false){
            setEditable(true);
            setEditStyle({
                background:'#ff6b81',
                border:'2px solid #ff6b81'
            })
          }
          else if(editable == true){
            setEditable(false);
            setEditStyle({
                background:'black',
                border:'2px solid rgba(255,255,255,0.3)'
            })
          };
    };

    const mouseDown = (e) => {
          if(editable){
              const height = e.target.height + 115;
              const width = e.target.width;
              const y = e.pageY - 60;
              const x = e.nativeEvent.clientX;

              const topPercentage = ( 100 / height ) * y;
              const leftPercentage = ( 100 / width ) * x;

              setTop(topPercentage);
              setLeft(leftPercentage);
          }
    }

    const mouseUp = (e) => {
          if(editable){
            const height = e.target.height + 115;
            const width = e.target.width;
            const y = e.pageY - 60;
            const x = e.nativeEvent.clientX;
            const testX = ( 100 / width ) * x;
            const testY = ( 100 / height ) * y;

            let heightPercentage;
            let widthPercentage;
            let lft;
            let tp;

            const topPercentage = ( 100 / height ) * y;
            const leftPercentage = ( 100 / width ) * x;

            if(testX > left){
                widthPercentage = leftPercentage - left;
                lft = left;
            } else if(left > testX){
                widthPercentage = left - leftPercentage;
                lft = testX;
            };
            
            if(testY > top){
                heightPercentage = topPercentage - top;
                tp = top;
            } else if(top > testY){
                heightPercentage = top - topPercentage;
                tp = testY;
            };

            setWidth(widthPercentage);
            setHeight(heightPercentage);
            setEditable(false);
            setOptionsStyle({
                display:'block'
            })
            setEditStyle({
                background:'black',
                border:'2px solid rgba(255,255,255,0.3)'
            });
            setSelectStyle({
                top: tp + '%',
                left: lft + '%',
                height: heightPercentage + '%',
                width: widthPercentage + '%'
            })
          }
    };

    const retryButton = () => {
        
        setSelectStyle({
            top:0,
            left:0,
            height:0,
            width:0
        });
        setOptionsStyle({
            display:'none'
        });

    }

    return (
        <div className='upload-edit-container'>
                   <div className='upload-loading' style={loader}>
                        <svg className='loading-circle-svg' height="100" width="100">
                         <circle className='loading-circle' cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="transparent" />
                        </svg>
                   </div>
                   <UploadMenu start={start} setEditError={setEditError} editError={editError} buttons={buttons} pages={pages} switchEdit={switchEdit} currentPage={currentPage} setStart={setStart} setRender={setRender} editStyle={editStyle} submitFiles={submitFiles}/>

                   <div className='upload-edit-img-container' onMouseDown={mouseDown} onMouseUp={mouseUp}>
                       {retrunImage()}
                       <div style={selectStyle} className='btn-select'>

                       </div>
                   </div>
                   <div style={optionsStyle} className='select-options'>
                       <div className='selected-middle'>
                           <h1 className='selected-middle-h1'>Target page</h1>
                           <div className='selected-options-options'>
                               <div onClick={()=>
                                       setListStyle({
                                           display:'block'
                                       })
                                   } className='selected-selected'>
                                   <h1 className='selected-selected-h1'>{targetClient}</h1>
                                   <img className='selected-down' src={process.env.PUBLIC_URL + '/imgs/down.svg'}></img>
                               </div>
                               <div className='selected-list' style={listStyle}>
                                   {clientNames.map( (name,index) => {
                                       return (
                                           <div onClick={
                                               ()=>{
                                                   setTargetClient(clientNames[index]);
                                                   setTarget(index);
                                                   setListStyle({
                                                       display:'none'
                                                   })
                                               }
                                           } className='selected-list-option'>
                                              <h1 className='selected-selected-h1'>{name}</h1>
                                           </div>
                                       )
                                   })}
                               </div>
                           </div>
                           <div className='selected-options-buttons'>
                              <button onClick={saveButton} className='selected-save'>Save</button>
                              <button className='selected-retry' onClick={retryButton}>Retry</button>
                           </div>
                       </div>
                   </div>
                   
                   <Slider setCurrentPage={setCurrentPage} setSrc={setSrc} blobs={blobs} changeFiles={changeFiles} />
        </div>
    )
};

const mapStateToProps = ({ user }) => {

    const { tests, id } = user;

    return {
        tests,
        id
    };
}

export default connect(mapStateToProps)(UploadEdit);
