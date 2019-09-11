import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

import GiftCards from './components/giftcards/giftcards';
import Posts from './components/posts/posts';
import DailyTodos from './components/todos/dailytodos';

const notFound = () =>  {
  return (
    <h2>404 Not found!</h2>
  );
};

class App extends React.Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route exact path="/giftcards" component={GiftCards}/>
            <Route exact path="/posts" component={Posts}/>
            <Route exact path="/dailytodos" component={DailyTodos}/>

            <Route component={notFound}/>
          </Switch>
      </Router>
    );
  }
}

export default App;
