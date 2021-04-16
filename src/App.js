import './App.scss';
import React from 'react';
import Home from './Components/Home';
import Movies from './Components/Movies';
import Books from './Components/Books';
// require('dotenv').config();
import { HashRouter,BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";

function App()  {
    return (
        <div className='page'>
            <BrowserRouter>
                <div className="bg"></div>
                <div className="bg bg2"></div>
                <div className="bg bg3"></div>
                <nav className= 'nav'>
                    <Link to='/' className={`link nav__link`}>Home</Link>
                    <Link to='/books' className={`link nav__link `}>Books</Link>
                    <Link to='/movies' className={`link nav__link`}>Movies </Link>
                </nav>
                <h1 className='heading'> Life After BrainStation</h1>
                <Switch>
                    <Redirect from='/home' to='/'/>
                    <Route path='/' exact component={Home}/>
                    <Route path='/movies' component={Movies}/>
                    <Route path='/books' component={Books}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
