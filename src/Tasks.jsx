import { useState, useEffect } from "react"
import TaskCard from "./TaskCard"

function Tasks() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    if (tasks.length == 0)
      fetch("http://localhost:5184/api/fillTodoItemsList")

    fetch("http://localhost:5184/api/TodoItems")
      .then(response => response.json())
      .then(data => {
        setTasks(data)
        console.log(data)
      })
  }, [])

  return (
    <>
      {
        tasks && tasks.length == 0 && (
          <p className='text-lg'>No pending tasks</p>
        )
      }
      {
        tasks && tasks.length > 0 && (
          <>
          <p className='text-lg'>List of tasks</p>
          <div className="py-1">
            <span className="text-md text-gray-400 uppercase">{tasks.length} Task{tasks.length > 1 ? 's' : ''}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-5">
            {
              tasks.map( task => (
                <TaskCard
                  key={task.id}
                  title={task.title}
                  description={task.description}
                />
              ))
            }
          </div>
          </>
        )
      }
    </>
  )
}

export default Tasks
