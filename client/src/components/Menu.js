import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser, fetchTest } from '../redux/actions';

function Menu({ id, type, name, logoutUser, fetchTest }) {

    const returnMenu = () => {
        if( type === 'DEVELOPER' ){
            return (
                    [<div onClick={logoutUser} className='logged-menu-button logout-btn'>
                        <div className='logged-menu-link'>Logout</div>
                    </div>,
                    <div className='logged-menu-button'>
                        <Link to='#' className='logged-menu-link'>{name}</Link>
                    </div>,
                    <div className='logged-menu-button'>
                        <Link to='/dashboard' className='logged-menu-link'>Dashboard</Link>
                    </div>]
            )
        }
        else if(type === 'TESTER'){
            return (
                    [<div onClick={logoutUser} className='logged-menu-button logout-btn'>
                        <div className='logged-menu-link'>Logout</div>
                    </div>,
                    <div className='logged-menu-button'>
                        <Link to='#' className='logged-menu-link'>{name}</Link>
                    </div>,
                    <div onClick={
                        ()=>{
                            fetchTest();
                        }
                    } className='logged-menu-button'>
                        <Link to='/test' className='logged-menu-link'>Take a Test</Link>
                    </div>] 
                    ) 
        }
        else if(!type){
            return (
                <Link to='/login'>
                   <button className='menu-login'>Sign In</button>
                </Link>  
            )
        }
    }

    return (
        <div className='menu-container'>
            <div className='menu-middle'>
                <Link to='/' className='menu-logo'>
                     <span>LOGO</span>
                </Link>
                {returnMenu()}
            </div>
        </div>
    )
}

const mapStateToProps = ({ user }) => {

    const { id, type, name, tests } = user;

    return {
      id,
      type,
      name,
      tests
    };
};

export default connect(mapStateToProps, { logoutUser, fetchTest })(Menu);
