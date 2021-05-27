import axios from 'axios';

import { FETCH_USER, FETCH_TESTS, FETCH_TEST, EMPTY_TEST } from './types';

export const fetchUser = () => async dispatch => {
    const payload = await axios.get('/currentuser');

    dispatch({ 
        type:FETCH_USER, 
        payload:payload.data 
    });
};

export const logoutUser = () => async dispatch => {
    const payload = await axios.get('/auth/logout');

    dispatch({
        type:FETCH_USER,
        payload:payload.data
    });
};

export const fetchTests = () => async dispatch => {
    const payload = await axios.get('/user-tests');

    dispatch({
        type:FETCH_TESTS,
        payload: payload.data
    });
};

export const fetchTest = () => async dispatch => {
    const payload = await axios.get('/tests');

    const length = payload.data.length;
    const random = Math.floor(Math.random() * length);

    const payloadResult = payload.data[random];

    dispatch({
        type:FETCH_TEST,
        payload: payloadResult
    });
};

export const emptyTest = () => async dispatch => {
    const payload = {};

    dispatch({
        type:EMPTY_TEST,
        payload
    });
};