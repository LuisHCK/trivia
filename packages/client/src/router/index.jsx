import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Admin from '../pages/admin';
import Landing from '../pages/landing';

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Landing />
                </Route>
                <Route path="/admin" exact>
                    <Admin />
                </Route>
            </Switch>
        </Router>
    );
};

export default AppRouter;
