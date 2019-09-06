import React from 'react';
import GiftCards from './components/giftcards/giftcards';
import 'bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

class App extends React.Component {


  render() {
    return (
      <div className="container">
        <GiftCards/>
      </div>
    );
  }
}

export default App;
