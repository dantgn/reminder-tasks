import { useState } from 'react'
import './App.css'

function TaskForm(props) {
  
  const { tasks, setTasks, addTaskResult, setAddTaskResult } = props

  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  
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
        setTasks([data, ...tasks])
        resetFields()
        setAddTaskResult("Task added successfully")
    })
    .catch(() => setAddTaskResult("Something wrong happened"))
  }

  function resetFields() {
    setTitle("")
    setDescription("")
  }

  return (
    <>
      <h3 className="font-bold text-lg">Add new Task!</h3>
      <form onSubmit={handleCreateNewTask} className="py-2">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input 
            type="text" 
            value={title}
            placeholder="Type the title of your task"
            className="input input-bordered w-full"
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea 
            value={description}
            className="textarea textarea-bordered h-24"
            placeholder="Describe what exactly needs to be done"
            onChange={(event) => setDescription(event.target.value)}
          >
          </textarea>
        </label>
        <button className="text-right my-5 btn btn-wide w-full uppercase" type="submit">Create Task</button>
      </form>
      <span className='py-5'>{addTaskResult}</span>
    </>
  )
}

export default TaskForm
