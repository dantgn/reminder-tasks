import { useState, useEffect } from "react"
import TaskCard from "./TaskCard"
import TaskForm from "./TaskForm"

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [addTaskResult, setAddTaskResult] = useState("")
  const VITE_BACKEND_API_ENDPOINT = import.meta.env.VITE_BACKEND_API_ENDPOINT

  useEffect(() => {
    fetchTasks()
  }, [])

  function fetchTasks () {
    fetch(`${VITE_BACKEND_API_ENDPOINT}/tasks`)
      .then(response => response.json())
      .then(data => {
        setTasks(data)
      })
      .catch(error => console.log(error.message))
  }

  function handleCloseForm(){
    setAddTaskResult("")
  }

  return (
    <>
      <div className="sm:flex text-center sm:justify-between my-10">
        <h1 className='text-2xl uppercase my-5 sm:my-0'>Reminder App</h1>
        <button 
          className="btn btn-neutral btn-outline btn-wide w-full sm:max-w-sm"
          onClick={()=>document.getElementById('addTaskModal').showModal()}
        >
          Add new task
        </button>
      </div>
      <dialog id="addTaskModal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <TaskForm
            tasks={tasks}
            setTasks={setTasks}
            addTaskResult={addTaskResult}
            setAddTaskResult={setAddTaskResult}
          />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button onClick={handleCloseForm} className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      {
        tasks && tasks.length == 0 && <p className='text-lg'>No pending tasks</p>
      }
      {
        tasks && tasks.length > 0 && (
          <>
          <p className='text-lg'>List of tasks</p>
          <div className="py-1">
            <span className="text-md text-gray-400 uppercase">{tasks.length} Task{tasks.length > 1 ? 's' : ''}</span>
          </div>
          <div className="rounded-xl shadow-xl border-4 border-gray-400 p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {
                tasks.map( task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    fetchTasks={fetchTasks}
                  />
                ))
              }
            </div>

          </div>
          </>
        )
      }
    </>
  )
}

export default Tasks
