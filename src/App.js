import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import GiftCards from './components/giftcards/giftcards';
import NavBar from './components/navbar';

import 'bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

class App extends React.Component {


  render() {
    return (
      <Router>
        <NavBar/>
        <div className="container">
            <Route path='/giftcards' component={GiftCards}/>
        </div>
      </Router>
    );
  }
}

export default App;
