import React from 'react';
import {BrowserRouter,Route,Link} from 'react-router-dom';
import Dashboard from '../dashboard/dashboard';

class App extends React.Component{
  render(){
    return(
      <div className='app'>
        <BrowserRouter>
          <div>
            <Route exact path='/' component={() => <h1>Home!</h1>}/>
            <Route exact path='/dashboard' component={Dashboard}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

export default App;