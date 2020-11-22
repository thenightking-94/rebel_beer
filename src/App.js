import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Browse from '../src/Components/Browse';


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={Browse} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;