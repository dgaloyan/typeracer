import React                   from 'react';
import axios                   from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, Redirect,
}                              from 'react-router-dom';
import Board                   from './components/board/Board';
import TextProvider            from './app/TextProvider';
import AppContainer            from './app/AppContainer';
import {AppContainerCtx}       from './withAppContainer';
import PercentageAnalyser      from './app/PercentageAnalyser';
import WPMAnalyser             from './app/WPMAnalyser';
import MatchingStrategyFactory from './app/MatchingStrategyFactory';

const TIME_TO_COMPLETE = 3000;

function App() {

    const textProvider = new TextProvider(axios);
    const appContainer = new AppContainer(
        textProvider,
        new MatchingStrategyFactory(),
        [new PercentageAnalyser(), new WPMAnalyser()],
        TIME_TO_COMPLETE
    );

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    Type Racer
                </header>
                <nav>
                    <ul>
                        <li>
                            <Link to="/board">Board</Link>
                        </li>
                    </ul>
                </nav>
                <AppContainerCtx.Provider value={{
                    appContainer,
                }}>
                    <Switch>
                        <Route path="/board">
                            <Board/>
                        </Route>
                        <Redirect to={'/board'}/>
                    </Switch>
                </AppContainerCtx.Provider>
            </div>
        </Router>
    );
}

export default App;
