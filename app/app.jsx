const React = require('react');
const { render } = require('react-dom');

// router
const Route = require('react-router-dom').Route;
const BrowserRouter = require('react-router-dom').BrowserRouter;
const hashHistory = require('react-router-dom').hashHistory;

import { Switch } from 'react-router-dom';

// redux
const { createStore, combineReducers } = require('redux');
const { Provider } = require('react-redux');
import board from './reducers/board';

const reducers = combineReducers({ board });

const store = createStore(reducers);

console.log(store.getState());

/* Import Components */
import { HelloWorld } from './components/HelloWorld';
import { Board } from './components/Board';
import { NotFoundPage } from './components/NotFoundPage';

render((
  <Provider store={store}>

    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={HelloWorld}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>), document.getElementById('main'));