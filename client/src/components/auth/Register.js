import React,{ useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

function Register({ id }) {

    const [ accountType, setAccountType ] = useState('TESTER');

    const [ error, setError ] = useState();

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const changeName = (e) => {
        setName(e.target.value);
    }
    const changeEmail = (e) => {
        setEmail(e.target.value);
    }
    const changePassword = (e) => {
        setPassword(e.target.value);
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
        const res = await axios.post('/auth/register', { type:accountType, name, email, password });

        if(res.data.error){
           setError(
               <p className='register-error'>{res.data.error}</p>
           )
        } else {
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
                            </div>
                            <div className='auth-input-container'>
                                <label htmlFor='email'>Your email</label>
                                <input value={email} onChange={changeEmail} type='text' id='email' className='auth-input'></input>
                                {error}
                            </div>
                            <div className='auth-input-container auth-input-last'>
                                <label htmlFor='password'>Password</label>
                                <input value={password} onChange={changePassword} type='password' id='password' className='auth-input'></input>
                            </div>
                            <div className='auth-input-checkbox'>
                                <input id='agree' type='checkbox' value='agreed'></input>
                                <label htmlFor='agree' className='agree-label'>I agree with the terms and conditions</label>
                            </div>
                            <div className='auth-submit-container'>
                            <button onClick={submitRegister} className='auth-submit-btn'>Sign Up</button>
                            <p className='auth-already'>Already have an account? <Link to='/login' className='auth-already-btn'>Sign In</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className='auth-right'>
                        <img className='auth-img' src={process.env.PUBLIC_URL + '/imgs/login.svg'}></img>
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
