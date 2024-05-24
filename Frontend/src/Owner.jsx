import React from 'react'
import Navigationbar1 from './components/Navigationbar1'
import {Outlet} from 'react-router-dom'
import './All.css'

export default function Owner() {
  return (
    <div className='all' style={{overflow: 'hidden'}}>
        <div className='navigation-container10'>
        <Navigationbar1 />
        </div>
        <div className='content30'>
        < Outlet />
        </div>
    </div>
  )
}
