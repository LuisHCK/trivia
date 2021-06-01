import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Admin from '../pages/admin'
import Landing from '../pages/landing'
import Room from '../pages/room'
import Trivia from '../pages/trivia'
import PrivateRoute from './private-route'

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Landing />
                </Route>

                <PrivateRoute component={Admin} path="/admin" exact />

                <PrivateRoute
                    component={Trivia}
                    path="/admin/trivia/:id"
                    exact
                />

                <Route path="/room/:id">
                    <Room />
                </Route>
            </Switch>
        </Router>
    )
}

export default AppRouter
