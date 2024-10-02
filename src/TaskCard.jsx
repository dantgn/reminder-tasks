import { useState } from 'react'
import './App.css'

function TaskCard(props) {
  const {title, description} = props

  return (
    <>
      <div className="card w-full shadow-xl postit text-left">
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </>
  )
}

export default TaskCard
