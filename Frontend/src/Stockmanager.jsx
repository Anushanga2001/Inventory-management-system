import React from 'react'
import {Outlet} from 'react-router-dom'
import Navigationbar2 from './components/Navigationbar2'

export default function Stockmanager() {
  return (
    <div className='all'>
        <div className='navigation-container10'>
            <Navigationbar2 />
        </div>
        <div className='content30'>
        <Outlet/>
        </div>
    </div>
  )
}
