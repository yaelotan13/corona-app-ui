import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { 
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import './App.css';

import Home from './Components/Home/Home';
import AboutUs from './Components/AboutUs/AboutUs';
import Survey from './Components/Survey/Survey';
import Map from './Components/Map/Map';
import NotFound404 from './Components/shared/NotFound/NotFound404';
import ServerError from './Components/shared/ServerError/ServerError';

import theme from './theme/index';

function App({ t }) {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/home" component={Home}/>
          <Route path="/about-us" component={AboutUs}/>
          <Route path="/survey" component={Survey}/>
          <Route path="/map" component={Map}/>
          <Route exact path="/error" component={() => <ServerError t={t}/>}/>
          <Route component={NotFound404}/>
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default withNamespaces()(App);
