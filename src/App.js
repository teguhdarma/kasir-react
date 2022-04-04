import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    BrowserRouter
  } from "react-router-dom";
  
  import { Home,Sukses,Info}from './pages'

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
            
            <main>
                <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route path="/sukses" component={Sukses} exact/>
                    <Route path="/info" component={Info} exact/>

                </Switch>
            </main>
            
            
            </BrowserRouter>
        )
    }
}
