import React from 'react';
import GiftCards from './components/giftcards/giftcards';
import NavBar from './components/navbar';

import 'bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

class App extends React.Component {


  render() {
    return (
      <React.Fragment>
        <NavBar/>
        <div className="container">
          <GiftCards/>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
