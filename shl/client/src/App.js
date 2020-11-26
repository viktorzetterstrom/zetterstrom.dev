import React from 'react';
import theme from './style/theme';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import AppContainer from './components/AppContainer';
import Header from './components/Header';
import StandingsTable from './components/tables/StandingsTable';
import GamesTable from './components/tables/GamesTable';
import GoaliesTable from './components/tables/GoaliesTable';
import SkatersTable from './components/tables/SkatersTable';
import WinstreaksTable from './components/tables/WinstreaksTable';
import Footer from './components/Footer';

const activeTheme = theme;

function App() {
  return (
    <Router>
      <AppContainer>
        <Header theme={activeTheme} />
        <Switch>
          <Route path="/standings">
            <StandingsTable theme={activeTheme} />
          </Route>
          <Route path="/games">
            <GamesTable theme={activeTheme} />
          </Route>
          <Route path="/statistics/goalies">
            <GoaliesTable theme={activeTheme} />
          </Route>
          <Route path="/statistics/skaters">
            <SkatersTable theme={activeTheme} />
          </Route>
          <Route path="/statistics/winstreaks">
            <WinstreaksTable theme={activeTheme} />
          </Route>
          <Route path="/statistics">
            <Redirect to="/statistics/goalies" />
          </Route>
          <Route path="/">
            <Redirect to="/standings" />
          </Route>
        </Switch>
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;
