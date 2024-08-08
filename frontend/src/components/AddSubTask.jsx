import React, { useState } from 'react'
import { useTodoContext } from '../context/TodoContext';
import { useParams } from 'react-router-dom';

export default function AddSubTask() {
    const [heading, setHeading] = useState('')
    const [desc, setDesc] = useState('')

    const { appendSubTask } = useTodoContext()

    const { todoId } = useParams()

    const handleSubTaskSave = (e) => {
        e.preventDefault();

        (
            async function () {
                await appendSubTask(todoId, heading, desc)
            }
        )()

        location.reload()
    }

    const handleCancel = () => {
        location.reload()
    }

    return (
        <>
            <form className='w-[80%] h-fit my-2 p-2'>
                <div className='w-[100%]'>
                    <input className='w-[100%] rounded-md m-2 p-1' id='title' name='title' placeholder='Heading' value={heading} onChange={(e) => setHeading(e.target.value)} type='text' />
                    <textarea rows='5' cols='100' className='w-[100%] rounded-md m-2 p-1' id='desc' name='desc' placeholder='Description' value={desc} onChange={(e) => setDesc(e.target.value)} type='text' />
                </div>
                <div className='flex justify-center'>
                    <button className='m-1 p-1 bg-green-700 text-white rounded-md' onClick={handleSubTaskSave} >Save</button>
                    <button className='m-1 p-1 bg-red-700 text-white rounded-md' onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </>
    )
}
