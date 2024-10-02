import { useState, useEffect } from "react"
import TaskCard from "./TaskCard"
import TaskForm from "./TaskForm"

function Tasks() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch("http://localhost:5184/api/TodoItems")
      .then(response => response.json())
      .then(data => {
        setTasks(data)
        console.log(data)
      })
  }, [])

  function handlePrefillList () {
    fetch("http://localhost:5184/api/fillTodoItemsList")
      .then(response => response.json())
      .then(data => {
        setTasks(data)
        console.log(data)
      })
  }

  return (
    <>
      <button className="btn btn-neutral btn-outline btn-wide my-5 pr-2" onClick={()=>document.getElementById('addTaskModal').showModal()}>Add new task</button>
      <dialog id="addTaskModal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Add new Task!</h3>
          <TaskForm tasks={tasks} setTasks={setTasks} />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <button 
        className="btn btn-neutral btn-outline btn-wide my-5 mx-5 px-2" 
        disabled={tasks.length > 0} onClick={handlePrefillList}
      >
        Pre-fill Tasks List
      </button>
      {
        tasks && tasks.length == 0 && (
          <>
            <p className='text-lg'>No pending tasks</p>
          </>
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
