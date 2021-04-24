import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Welcome from './welcome'
import Question from './question'
import { RoomContextProvider } from '../../context/room.context'
import InvalidRoom from './invalid-room'
import './index.scss'

const Room = () => {
    return (
        <main className="room-page">
            <RoomContextProvider>
                <Router>
                    <Switch>
                        <Route path="/room/:id" exact>
                            <Welcome />
                        </Route>
                        <Route path="/room/:id/questions/:questionId" exact>
                            <Question />
                        </Route>
                        <Route path="/invalid-room" exact>
                            <InvalidRoom />
                        </Route>
                    </Switch>
                </Router>
            </RoomContextProvider>
        </main>
    )
}

export default Room
