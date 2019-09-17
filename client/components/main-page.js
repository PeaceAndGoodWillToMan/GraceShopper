import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {Login, Signup} from './auth-form'
import UserHome from './user-home'
import BoardList from './board-all'
import BoardSingle from './board-single'

const MainPage = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/home" component={UserHome} />
        <Route exact path="/boards" component={BoardList} />
        <Route exact path="/boards/:id" component={BoardSingle} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </div>
  )
}

export default MainPage
