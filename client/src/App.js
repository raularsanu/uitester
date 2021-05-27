import { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchUser } from './redux/actions';

import Menu from './components/Menu';
import Register from './components/auth/Register';
import Home from './components/home/Home';
import Upload from './components/upload/Upload';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import Test from './components/test/Test';

function App({ fetchUser }) {
 
  useEffect(()=>{
     fetchUser();
  });

  return (
  <BrowserRouter>
    <div className="App">
       <Route exact path='/' component={Home}></Route>
       <Route exact path='/register' component={Register}></Route>
       <Route exact path='/login' component={Login}></Route>
       <Route exact path='/upload' component={Upload}></Route>
       <Route exact path='/dashboard' component={Dashboard}></Route>
       <Route exact path='/test' component={Test}></Route>
    </div>
  </BrowserRouter>
  );
};

const mapStateToProps = ( {user} ) => {

    const { type, name, id, tests } = user;

    return {
      type,
      name,
      id,
      tests
    };
};

export default connect( mapStateToProps, { fetchUser } )(App);
