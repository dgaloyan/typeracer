import React, {useEffect, useState}                      from 'react'
import axios                                             from 'axios'
import {BrowserRouter as Router, Link, Redirect, Switch} from 'react-router-dom'
import Board                                             from './components/board/Board'
import TextProvider                                      from './app/TextProvider'
import AppContainer                                      from './app/AppContainer'
import {AppContainerCtx}                                 from './withAppContainer'
import PercentageAnalyser                                from './app/PercentageAnalyser'
import WPMAnalyser                                       from './app/WPMAnalyser'
import MatchingStrategyFactory                           from './app/MatchingStrategyFactory'
import StatsRepository                                   from './app/StatsRepository'
import UserRepository                                    from './app/UserRepository'
import Register                                          from './components/auth/Register'
import Login                                             from './components/auth/Login'
import PrivateRoute                                      from './commons/PrivateRoute'
import Stats                                             from './components/stats/Stats'
import PublicRoute                                       from './commons/PublicRoute'
import './index.css'

const timeFromUrl = new URL(window.location).searchParams.get('time')

const TIME_TO_COMPLETE = timeFromUrl ? timeFromUrl : 180_000

function App() {


    const textProvider    = new TextProvider(axios)
    const userRepository  = new UserRepository(axios)
    const statsRepository = new StatsRepository(axios, userRepository)

    const appContainer = new AppContainer(
        textProvider,
        new MatchingStrategyFactory(),
        [new PercentageAnalyser(), new WPMAnalyser()],
        statsRepository,
        userRepository,
        TIME_TO_COMPLETE,
    )

    const [, setLoggedIn] = useState(userRepository.isLoggedIn)

    useEffect(() => {
        userRepository.subscribe('loginChange', (loginState) => {
            setLoggedIn(loginState)
        })
    }, [userRepository])

    //const history = createBrowserHistory({ basename: '/your-base-name' });

    return (
        <Router basename={'/typeracer'}>
            <div className="App">
                <header className="App-header">
                    Type Racer
                </header>
                <nav>
                    <ul>
                        {!userRepository.isLoggedIn ? (
                            <>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link to="/register">Register</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/board">Board</Link>
                                </li>
                                <li>
                                    <Link to="/stats">Stats</Link>
                                </li>
                                <li onClick={() => {
                                    userRepository.logout()
                                }}>
                                    Logout
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
                <AppContainerCtx.Provider value={{
                    appContainer,
                }}>
                    <Switch>
                        <PrivateRoute path="/board">
                            <Board/>
                        </PrivateRoute>
                        <PrivateRoute path="/stats">
                            <Stats/>
                        </PrivateRoute>
                        <PublicRoute path="/register">
                            <Register/>
                        </PublicRoute>
                        <PublicRoute path="/login">
                            <Login/>
                        </PublicRoute>
                        <Redirect to={'/board'}/>
                    </Switch>
                </AppContainerCtx.Provider>
            </div>
        </Router>
    )
}

export default App
