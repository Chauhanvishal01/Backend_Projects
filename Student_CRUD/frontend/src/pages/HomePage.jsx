import React from 'react'
import Register from '../components/Register'
import Display from '../components/Display'

const HomePage = () => {
  return (
    <div className='flex justify-around container mt-20 '>
    <Register />
    <Display />

    </div>
  )
}

export default HomePage