import { useState } from 'react'
import './App.css'

function TaskForm(props) {
  
  const { tasks, setTasks } = props

  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [result, setResult] = useState()
  
  function handleCreateNewTask (event) {
    event.preventDefault()

    fetch("http://localhost:5184/api/TodoItems", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({title: title, description: description})
    })
    .then(response => response.json())
    .then(data => {
        setTasks([...tasks, data])
        setResult("Task added successfully")
    });
    
  }

  return (
    <>
      <form onSubmit={handleCreateNewTask}>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Task Title</span>
          </div>
          <input 
            type="text" 
            placeholder="Type the title of your task"
            className="input input-bordered w-full"
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Task Description</span>
          </div>
          <textarea 
            className="textarea textarea-bordered h-24"
            placeholder="Describe what exactly needs to be done"
            onChange={(event) => setDescription(event.target.value)}
          >
          </textarea>
        </label>
        <button className="text-right my-5 btn btn-wide w-full uppercase" type="submit">Create Task</button>
      </form>
      <span className='py-5'>{result}</span>
    </>
  )
}

export default TaskForm
