import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import HomeContainer from '../components/HomeContainer';

const useStyles = makeStyles(() => ({
  container: {
    background: 'linear-gradient(#25172D, #100a13) fixed',
    height: '100%',
    overflowY: 'auto',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomeContainer />
          </Route>
          <Route exact path="/title/:id">
            <HomeContainer />
          </Route>
          <Route path="*">
            <Redirect to={{ pathname: '/' }} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
