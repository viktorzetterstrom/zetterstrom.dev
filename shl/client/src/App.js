import React from "react";
import GlobalStyle from "./style/global";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AppContainer from "./components/AppContainer";
import Header from "./components/Header";
import StandingsTable from "./components/tables/StandingsTable";
import GamesTable from "./components/tables/GamesTable";
import GoaliesTable from "./components/tables/GoaliesTable";
import SkatersTable from "./components/tables/SkatersTable";
import WinstreaksTable from "./components/tables/WinstreaksTable";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <AppContainer>
        <GlobalStyle />
        <Header />
        <Switch>
          <Route path="/standings">
            <StandingsTable />
          </Route>
          <Route path="/games">
            <GamesTable />
          </Route>
          <Route path="/statistics/goalies">
            <GoaliesTable />
          </Route>
          <Route path="/statistics/skaters">
            <SkatersTable />
          </Route>
          <Route path="/statistics/winstreaks">
            <WinstreaksTable />
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
