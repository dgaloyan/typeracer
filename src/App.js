import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
}            from 'react-router-dom';
import Board from './components/board/Board';

function App() {
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
                <Switch>
                    <Route path="/board">
                        <Board/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
