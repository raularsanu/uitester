import React,{ useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

function Register({ id }) {

    const [ loader, setLoader ] = useState({
        display:'none'
    });

    const [ accountType, setAccountType ] = useState('TESTER');

    const [ nameError, setNameError ] = useState();
    const [ emailError, setEmailError ] = useState();
    const [ passwordError, setPasswordError ] = useState();
    const [ agreeError, setAgreeError ] = useState();

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ agreed, setAgreed ] = useState(false);

    const testPassword = (pass) => {
        if(pass.length > 5){
            let strenght = 0;
        
            const testRegex = (reg) => {
                if(reg.test(pass)){
                    return 20
                } else return 0;
            };
    
            strenght = strenght + testRegex(/[A-Z]/g) + testRegex(/[a-z]/g) + testRegex(/[0-9]/g);
            if(strenght == 60){
                setPasswordError();
            } else {
                setPasswordError(<p className='register-error'>Password is too weak</p>)
            }
        } else {
            setPasswordError(<p className='register-error'>Password is too short</p>);
        }

    }

    const testEmail = (em) => {
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(reg.test(em)){
            setEmailError();
        } else {
            setEmailError(<p className='register-error'>Please enter a valid email</p>);
        }
    }

    const changeName = (e) => {
        setName(e.target.value);
        setNameError();
    }
    const changeEmail = (e) => {
        setEmail(e.target.value);
        setEmailError();
        testEmail(e.target.value);
    }
    const changePassword = (e) => {
        setPassword(e.target.value);
        setPasswordError();
        testPassword(e.target.value);
    }

    const [ testBtn, setTestBtn ] = useState({
        backgroundColor:'#5244CB',
        color:'white'
    })

    const [ devBtn, setDevBtn ] = useState({
        backgroundColor:'white',
        color:'black'
    })

    const submitRegister = async () => {

        setLoader({
            display:"block"
        });

        const res = await axios.post('/auth/register', { type:accountType, name, email, password });

        if(res.data.error){
            setLoader({
                display:"none"
            });
           setEmailError(
               <p className='register-error'>{res.data.error}</p>
           )
        } else {
            setLoader({
                display:"block"
            });
            window.location = '/';
        }
    }

    const changeRender = () => {
        if(id){
            return (
                <Redirect to='/' />
            )
        } else {
            return (
            <div>
            <div style={loader} className='auth-loading'>
                        <svg className='loading-circle-svg' height="100" width="100">
                           <circle className='loading-circle' cx="50" cy="50" r="40" fill="transparent" />
                        </svg>
            </div>
            <div className='auth-container'>
                    <div className='auth-left'>
                        <Link to='/' className='logo-auth'><span>LOGO</span></Link>
                        <h1 className='auth-header'>Sign Up</h1>
                        <p className='auth-paragraph'>What type of account do you want?</p>
                        <div className='auth-buttons'>
                        <button style={testBtn} className='auth-button auth-btn-left' onClick={
                            ()=>{
                                setAccountType('TESTER');
                                setDevBtn({
                                    backgroundColor:'white',
                                    color:'black'
                                });
                                setTestBtn({
                                    backgroundColor:'#5244CB',
                                    color:'white'
                                });
                            }
                        }>TESTER</button>
                        <button style={devBtn} className='auth-button auth-btn-right' onClick={
                            ()=>{
                                setAccountType('DEVELOPER');
                                setDevBtn({
                                    backgroundColor:'#5244CB',
                                    color:'white'
                                });
                                setTestBtn({
                                    backgroundColor:'white',
                                    color:'black'
                                });
                            }
                        }>DEVELOPER</button>
                        </div>
                        <div className='auth-form'>
                            <input type='text' value={accountType} className='auth-type-hidden'></input>
                            <div className='auth-input-container'>
                                <label htmlFor='name'>Name</label>
                                <input value={name} onChange={changeName} type='text' id='name' className='auth-input'></input>
                                {nameError}
                            </div>
                            <div className='auth-input-container'>
                                <label htmlFor='email'>Your email</label>
                                <input value={email} onChange={changeEmail} type='text' id='email' className='auth-input'></input>
                                {emailError}
                            </div>
                            <div className='auth-input-container auth-input-last'>
                                <label htmlFor='password'>Password</label>
                                <input value={password} onChange={changePassword} type='password' id='password' className='auth-input'></input>
                                {passwordError}
                            </div>
                            <div className='auth-input-checkbox'>
                                <input id='agree' type='checkbox' onChange={
                                    ()=>{
                                        if(agreed == false){
                                            setAgreed(true);
                                            setAgreeError();
                                        } else {
                                            setAgreed(false);
                                        }
                                    }
                                }></input>
                                <label htmlFor='agree' className='agree-label'>I agree with the terms and conditions</label>
                                {agreeError}
                            </div>
                            <div className='auth-submit-container'>
                            <button onClick={()=>{
                                if((name != '') && (email != '') && (password != '') && (agreed == true)){
                                    if((passwordError == null) && (emailError == null)){
                                        submitRegister();
                                    }
                                } else if((name == '') || (email == '') || (password == '')){
                                    if(name == ''){
                                        setNameError(<p className='register-error'>Name cannot be empty</p>)
                                    }
                                    if(email == ''){
                                        setEmailError(<p className='register-error'>Email cannot be empty</p>)
                                    }
                                    if(password == ''){
                                        setPasswordError(<p className='register-error'>Password cannot be empty</p>)
                                    }
                                    if(agreed == false){
                                        setAgreeError(<p className='register-error'>You must agree with out terms and conditions</p>)
                                    }
                                }
                            }} className='auth-submit-btn'>Sign Up</button>
                            <p className='auth-already'>Already have an account? <Link to='/login' className='auth-already-btn'>Sign In</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className='auth-right'>
                        <img className='auth-img' src={process.env.PUBLIC_URL + '/imgs/login.svg'}></img>
                    </div>
            </div>
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

const mapStateToProps = ({ id }) => {
    return {
        id
    }
};

export default connect(mapStateToProps)(Register);
