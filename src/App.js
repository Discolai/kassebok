import React from 'react';
import GiftCards from './components/giftcards/Giftcards';

class App extends React.Component {
  state = {
    giftcards: [
      {
        id: 0,
        val: 500,
        sold_on: '19-10-1998',
        sold_by: 'Nikolai',
        received_on: '',
        received_by: 'Nikolai'
      },
      {
        id: 1,
        val: 900,
        sold_on: '09-10-1998',
        sold_by: 'Nikolai',
        received_on: '20-10-2020',
        received_by: 'Nikolai'
      },
      {
        id: 2,
        val: 300,
        sold_on: '19-10-1998',
        sold_by: 'Nikolai',
        received_on: '23-02-1999',
        received_by: 'Nikolai'
      }
    ]
  }

  render() {
    return (
      <div className="container">
        <GiftCards giftcards={this.state.giftcards}/>
      </div>
    );
  }
}

export default App;
