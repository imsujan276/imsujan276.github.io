import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route  } from 'react-router-dom';
import MainApp from "./MainApp";
import PrivacyPolicy from "./PrivacyPolicy";
import NavBar from "./components/NavBar";
import FallbackSpinner from "./components/FallbackSpinner";
import "./App.css";
import "./styles/Global.css";
import "rsuite/dist/styles/rsuite-default.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <NavBar></NavBar>
          <Switch>
            <Suspense fallback={<FallbackSpinner />}>
              <Route path="/" exact component={MainApp} />
              <Route path="/privacy-policy" component={PrivacyPolicy} />
            </Suspense>
          </Switch>
          <MainApp />
      </BrowserRouter>
      {/* <NavBar></NavBar>
      <div id="content">
        <Intro></Intro>
        <About></About>
        <Experience></Experience>
        <Projects></Projects>
        <Credits></Credits>
      </div> */}
    </div>
  );
}

export default App;
