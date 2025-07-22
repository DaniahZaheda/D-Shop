import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './components/user/Footer/Footer'
import Navbar from './components/user/Navbar/Navbar'
import './App.css';

export default function Root() {
  return (
    <>

      <div className="page-container">
        <Navbar />
        <main className="content-wrap">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  )
}

