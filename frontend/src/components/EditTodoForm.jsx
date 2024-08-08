import React, { useEffect, useState } from 'react'
import { useTodoContext } from '../context/TodoContext';
import { useNavigate, useParams } from 'react-router-dom';

function EditTodoForm() {
    const { editTodo } = useTodoContext();
    const { todoId } = useParams()

    console.log(localStorage.getItem('title'));
    console.log(localStorage.getItem('desc'));

    const [title, setTitle] = useState()
    const [desc, setDesc] = useState()

    const nav = useNavigate();

    const handleSave = () => {
        (
            async function () {
                await editTodo(todoId, { 'title': title, 'desc': desc })
            }
        )()

        nav('/')
    }

    return (
        <div className='w-[50vw] mx-auto h-[70vh] p-4'>
            <form className='w-full h-full border-2 border-black border-solid rounded-2xl bg-slate-400'>
                <div className='flex flex-col gap-20'>
                    <h1 className='text-white text-center text-3xl font-bold mt-4'>Edit Todo</h1>
                    <div className='flex flex-col gap-4 items-center'>
                        <div className='flex gap-12'>
                            <label className='text-white' htmlFor='title'>Todo Title</label>
                            <input className='w-96 rounded-md p-1' id='title' name='title' type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className='flex gap-2'>
                            <label className='text-white' htmlFor='desc'>Todo Description</label>
                            <textarea className='w-96 h-32 rounded-md p-1' id='desc' name='desc' type='text' value={desc} onChange={(e) => setDesc(e.target.value)} />
                        </div>
                    </div>
                    <button className='w-16 mx-auto bg-green-500 p-2 border-2 border-solid border-black rounded-md hover:cursor-pointer hover:opacity-55' onClick={() => handleSave()}>
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditTodoForm