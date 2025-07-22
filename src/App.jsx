import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import  './index.css'

export default function App() {
  return (
<RouterProvider  router={router} />
  )
}
