import { useState } from 'react'
import './App.css'
import Tasks from './Tasks'

function App() {
  return (
    <>
      <div className='p-10'>
        <h1 className='text-2xl p-5'>Reminder App!</h1>
      </div>
      <Tasks />
    </>
  )
}

export default App