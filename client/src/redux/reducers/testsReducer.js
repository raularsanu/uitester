import { FETCH_TESTS } from '../actions/types';

const testsReducer = ( state = [], action) => {
    switch( action.type ) {
        case FETCH_TESTS: 
           return action.payload
        
        default: return state
    }
};

export default testsReducer;