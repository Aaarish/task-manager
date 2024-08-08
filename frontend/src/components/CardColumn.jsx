import React, { useEffect, useState } from 'react'
import Card from './Card'
import { useTodoContext } from '../context/TodoContext'

function CardColumn({ heading }) {
  const [todos, setTodos] = useState([])

  const { getTodos } = useTodoContext()

  useEffect(() => {
    (async function () {
      setTodos(await getTodos())
    })()
    localStorage.clear()
  }, [])

  return (
    <div className='w-[25%] min-w-fit h-full p-2 overflow-auto flex flex-col gap-2 relative'>
      <div className='h-12 text-center text-2xl font-bold sticky'>
        <h1>{heading}</h1>
      </div>
      {
        todos.map(todo => {
          if (todo.state === heading) {
            return <Card key={todo.todo_id} todoId={todo.todo_id} todoTitle={todo.title} todoDesc={todo.desc} state={todo.state} />
          }
        })
      }
    </div>
  )
}

export default CardColumn