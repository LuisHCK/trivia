import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Admin from '../pages/admin'
import Landing from '../pages/landing'
import Trivia from '../pages/trivia'

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

                <Route path="/admin/trivia/:id" exact>
                    <Trivia />
                </Route>
            </Switch>
        </Router>
    )
}

export default AppRouter
