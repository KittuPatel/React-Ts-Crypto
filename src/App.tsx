import React from 'react'
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { Layout, Typography, Space } from 'antd'
import { Navbar, Homepage, Exchanges, Cryptocurrencies, CryptoDetails, News } from './components'

const App = () => {
  return (
    <Router>
      <div className='app'>
        <div className="navbar">
          <Navbar />
        </div>
        <div className="main">
          <Layout>
            <div className="routes">
              <Routes>
                <Route path='/' >
                  <Homepage />
                </Route>
                <Route path='/exchanges' >
                  <Exchanges />
                </Route>
                <Route path='/cryptocurrencies' >
                  <Cryptocurrencies />
                </Route>
                <Route path='/crypto/:coinId' >
                  <CryptoDetails />
                </Route>
                <Route path='/news' >
                  <News />
                </Route>
              </Routes>
            </div>
          </Layout>
        </div>
        <div className="footer">

        </div>
      </div>
    </Router>
  )
}

export default App

