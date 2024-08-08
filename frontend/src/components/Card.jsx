import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTodoContext } from '../context/TodoContext';

function Card({ todoId, todoTitle, todoDesc, state }) {
  const nav = useNavigate();

  const { editTodo, deleteTodo } = useTodoContext()

  const [todoState, setTodoState] = useState(state)

  const handleView = (todoId) => {
    localStorage.setItem('title', todoTitle)
    localStorage.setItem('desc', todoDesc)
    nav(`view/${todoId}`);
  }

  const handleDelete = async (todoId) => {
    await deleteTodo(todoId)
    location.reload()
  }

  const handleSelect = (currentTodoState) => {
    setTodoState(currentTodoState)
    console.log(todoState);

    callEditTodo(todoState)
  }

  const callEditTodo = async (tState) => {
    await editTodo(todoId, { 'state': tState })
  }

  return (
    < div className='w-[400px] w-min-[150px] h-min-[300px] h-fit px-3 pt-2 pb-3 bg-slate-600 rounded-xl text-white' >
      <h1 className='text-center text-xl'>{todoTitle}</h1>
      <select id='state-selector' className='rounded-lg px-1 mt-4 text-black bg-white hover:cursor-pointer' name="state" value={todoState} onInput={e => handleSelect(e.target.value)}>
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN PROGRESS</option>
        <option value="DONE">DONE</option>
      </select>
      <div className='h-[200px] mt-4 p-2 overflow-hidden rounded-xl bg-slate-500'>
        <p>{todoDesc}</p>
      </div>
      <div className='mt-3 text-white flex justify-center gap-1'>
        <button className='w-20 p-1 bg-green-400 rounded-md hover:opacity-55 hover:cursor-pointer' onClick={() => handleView(todoId)}>View</button>
        <button className='w-20 p-1 bg-red-600 text-white rounded-md hover:opacity-55 hover:cursor-pointer' onClick={() => handleDelete(todoId)}>Delete</button>
      </div>
    </div >
  )
}

export default Card