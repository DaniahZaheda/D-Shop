import React from 'react'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
   <>
   <h1>admin page</h1>
   <Outlet />
  <p>end</p>

   </>
  )
}
