import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import React from 'react'

import { BrowserRouter } from 'react-router-dom'

import Logo from '../components/template/Logo'
import Nav from '../components/template/nav'
import Main from '../components/template/Main'
import Home from '../components/home/Home'
import Routers from './Routers'
import Footer from '../components/template/Footer'


export default props => 
  <BrowserRouter>
 <div className="App">
    <Logo/>
    <Nav/>
    <Routers/>
    <Footer/>
 </div>
 </BrowserRouter>
