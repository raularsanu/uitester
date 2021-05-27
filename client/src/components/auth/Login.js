import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux'; 

function Login({ id }) {

    const [ loader, setLoader ] = useState({
        display:'none'
    });

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const changeEmail = (e) => {
        setEmail(e.target.value);
    };
    const changePassword = (e) => {
        setPassword(e.target.value);
    };

    const submitLogin = async () => {

        setLoader({
            display:"block"
        });
        const res = await axios.post('/auth/login', { email, password });

        window.location = '/';
    };

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
                    <h1 className='auth-header'>Sign In</h1>
                    <div className='auth-form'>
                        <div className='auth-input-container'>
                            <label htmlFor='email'>Your email</label>
                            <input value={email} onChange={changeEmail} type='text' id='email' className='auth-input'></input>
                        </div>
                        <div className='auth-input-container auth-input-last'>
                            <label htmlFor='password'>Password</label>
                            <input value={password} onChange={changePassword} type='password' id='password' className='auth-input'></input>
                            <p className='auth-login-forgot'>Forgot your password?</p>
                        </div>
                        <div className='auth-submit-container'>
                            <button onClick={()=>{
                                  if(email != '' && password != ''){
                                      submitLogin();
                                  }
                            }} className='auth-submit-btn'>Sign In</button>
                            <p className='auth-already'>Don't have an account? <Link to='/register' className='auth-already-btn'>Sign Up</Link></p>
                        </div>
                    </div>
                    </div>
                    <div className='auth-right'>
                        <img className='auth-img' src={process.env.PUBLIC_URL + '/imgs/login.svg'}></img>
                    </div>
                </div>
              </div>
            )
        };
    };

    return (
        <div>
            {changeRender()}
        </div>
    )
}

const mapStateToProps = ({ id }) => {
    return { 
        id
    };
};

export default connect(mapStateToProps)(Login);
