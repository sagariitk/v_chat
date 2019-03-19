import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Error from './components/Error';

import './App.css';

export default class App extends React.Component {
    render() {
        return(
            <div>
            <BrowserRouter>
            <div>
                <Switch>
                    <Route path = "/" component = {Home} exact  />
                    <Route component = {Error} />
                    </Switch>
            </div>
            </BrowserRouter>
            </div>
        )
    }
}
