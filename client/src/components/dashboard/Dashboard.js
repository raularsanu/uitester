import React,{ useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchTests } from '../../redux/actions/index';

import Menu from '../Menu';
import LocationTwo from '../LocationTwo';

function Dashboard({ tests, fetchTests, type }) {

    useEffect(()=>{  

         fetchTests();

    }, []);

    const renderFeedback = (test) => {
        if(test.responses.length == 0){
            return (
                <p className='dashboard-response'>No responses yet</p>
            );
        } else if(test.responses.length > 0){
            return test.responses.map(response => {
                return (
                    <p className='dashboard-response'>{response}</p>
                );
            });
        };
    };

    const renderComponent = () => {
        if(type === 'DEVELOPER') {
            return (
                <div>
                    <Menu />
                    <LocationTwo />
                    <div className='dashboard-container'>
                    <div className='dashboard-middle'>
                        <h1 className='dashboard-h1'>DASHBOARD</h1>
                        <div className='dashboard-add-container'>
                            <Link to='/upload'>
                            <div className='dashboard-add-button'>
                                <img src={process.env.PUBLIC_URL + '/imgs/plus.svg'}></img>
                                <h1>Add project</h1>
                            </div>
                            </Link>
                        </div>
                        <div className='dashboard-tests-container'>
                            {tests.map(test => {
                                return (
                                    <div className='dashboard-test'>
                                        <div className='dashboard-test-utils'>
                                                <h3>{test.name}</h3>
                                                <button>Delete Test</button>
                                        </div>
                                        <p className='dashboard-p'>Responses</p>
                                        {renderFeedback(test)}
                                    </div>
                                )
                            })}
                            

                        </div>
                    </div>
                    </div>
                </div>
            )
        } else {
            return (
                <Redirect to='/' />
            )
        }
    }

    return (
        <div>
            {renderComponent()}
        </div>
    )
};

const mapStateToProps = ({ tests, user }) => {

    const { type } = user;

    return {
        tests,
        type
    };
};

export default connect(mapStateToProps, { fetchTests })(Dashboard);
