import { FETCH_TEST, EMPTY_TEST } from '../actions/types';

const testReducer = ( state = {}, action) => {
    switch( action.type ) {
        case FETCH_TEST: 
           return action.payload
        
        case EMPTY_TEST:
            return action.payload
        
        default: return state
    }
};

export default testReducer;