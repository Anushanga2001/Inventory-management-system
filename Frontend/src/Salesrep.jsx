import React from 'react'
import Navigationbar3 from './components/Navigationbar3'
import {Outlet} from 'react-router-dom'
import './All.css'

export default function Salesrep() {
  return (
    <div className='all'>
        <div className='navigation-container10'>
            <Navigationbar3 />
        </div>
        <div className='content30'>
        <Outlet />
        </div>     
    </div>
  )
}
