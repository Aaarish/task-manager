import React, { useState } from 'react'
import { useTodoContext } from '../context/TodoContext';
import { useNavigate } from 'react-router-dom';

function AddTodoForm() {
    const [title, setTitle] = useState(null)
    const [desc, setDesc] = useState(null)

    const { addTodo } = useTodoContext();

    const nav = useNavigate()

    const handleSave = () => {
        (
            async function () {
                await addTodo({ title, desc })
            }
        )()

        nav('/')
    }

    const handlePrev = () => {
        nav('/')
    }

    return (
        <div className='w-[80%] mx-auto p-4'>
            <button className='bg-green-500 text-white text-xl rounded-lg p-2' onClick={handlePrev}>Prev</button>
            <form className='w-[100%] h-[100%]'>
                <div>
                    <div className='p-3'>
                        <input className='w-[100%] m-2 p-2 rounded-md text-center text-3xl' id='title' name='title' placeholder='Todo Title' type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                        <textarea rows='10' cols='10' className='w-[100%] h-fit m-2 p-2 rounded-md' id='desc' name='desc' placeholder='Todo Description' type='text' value={desc} onChange={(e) => setDesc(e.target.value)} />
                    </div>
                    <div className='text-center'>
                        <button className='w-24 bg-green-500 p-2 rounded-xl hover:cursor-pointer hover:opacity-55' onClick={() => handleSave()}>Save</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddTodoForm