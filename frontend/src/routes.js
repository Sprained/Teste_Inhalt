import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Login from './Pages/Login/login';
import Home from './Pages/Home/home';
import AddItem from './Pages/AddItem/item';
import AddUser from './Pages/AddUser/user';

export default function Routes(){
    return(
        <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/home' component={Home} />
            <Route path='/item' component={AddItem} />
            <Route path='/user' component={AddUser} />
        </Switch>
    )
}