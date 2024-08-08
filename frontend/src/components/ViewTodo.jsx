import React, { useEffect, useState } from 'react'
import { useTodoContext } from '../context/TodoContext'
import Subtask from './Subtask'
import { useNavigate, useParams } from 'react-router-dom'
import AddSubTask from './AddSubTask'

function ViewTodo() {
    const [todo, setTodo] = useState({})
    const [subTaskList, setSubTaskList] = useState([])
    const [isClicked, setIsClicked] = useState(false)
    const [isTitleEditable, setIsTitleEditable] = useState(false)
    const [isDescEditable, setIsDescEditable] = useState(false)

    const { getTodo, editTodo } = useTodoContext()

    const nav = useNavigate()

    const { todoId } = useParams()
    let res = null

    useEffect(() => {
        (
            async function () {
                res = await getTodo(todoId)
                setTodo(res)
                setSubTaskList(res.subTasks)
            }
        )()
    }, [res])

    const [title, setTitle] = useState(localStorage.getItem('title'))
    const [desc, setDesc] = useState(localStorage.getItem('desc'))

    const handleAdd = () => {
        setIsClicked(true)
    }

    const handleTitleEdit = () => {
        !isTitleEditable ? setIsTitleEditable(true) : setIsTitleEditable(false)
    }

    const handleDescEdit = () => {
        !isDescEditable ? setIsDescEditable(true) : setIsDescEditable(false)
    }

    const handleTitleSave = async () => {
        await editTodo(todoId, { 'title': title })
        location.reload()
    }

    const handleDescSave = async () => {
        await editTodo(todoId, { 'desc': desc })
        location.reload()
    }

    const handleCancel = () => {
        location.reload()
    }

    const handlePrev = () => {
        nav('/')
    }


    return (
        <div className='w-[50vw] mx-auto h-[70vh] p-4'>
            <div className='w-full h-full'>
                <div className='flex flex-col gap-20'>
                    <div className='flex justify-center items-center gap-3'>
                        <button className='bg-green-500 text-white text-xl rounded-lg p-2' onClick={handlePrev}>Prev</button>
                        {
                            isTitleEditable ? <div><input type="text" className='text-center text-3xl font-bold mt-4 rounded-lg' value={title} onChange={(e) => setTitle(e.target.value)} />
                                <div className='flex justify-center'><button className='m-1 p-1 bg-green-700 text-white rounded-md' onClick={handleTitleSave}>Save</button>
                                    <button className='m-1 p-1 bg-red-700 text-white rounded-md' onClick={handleCancel}>Cancel</button></div>
                            </div>
                                : <h1 className='w-[100%] text-center text-3xl font-bold mt-4 peer' onClick={handleTitleEdit}>{todo !== null ? todo.title : 'dummy title'}</h1>

                        }
                    </div>
                    <div className='flex justify-center items-center gap-3 group'>
                        {
                            isDescEditable ? <div><textarea rows='5' cols='100' type="text" className='text-center rounded-lg' value={desc} onChange={(e) => setDesc(e.target.value)} />
                                <div className='flex justify-center'><button className='m-1 p-1 bg-green-700 text-white rounded-md' onClick={handleDescSave}>Save</button>
                                    <button className='m-1 p-1 bg-red-700 text-white rounded-md' onClick={handleCancel}>Cancel</button></div>
                            </div>
                                : <p className='text-center' onClick={handleDescEdit}>{todo !== null ? todo.desc : 'dummy desc'}</p>
                        }
                    </div>
                    {
                        subTaskList !== null && subTaskList.length !== 0 ?
                            subTaskList.map(subTask =>
                                <Subtask key={subTask.subTaskId} subtaskId={subTask.subTaskId} heading={subTask.heading} description={subTask.desc} />
                            ) : ''
                    }
                    <div className='w-[100%] flex justify-between items-center'>
                        <button className='w-20 h-20 text-center text-white bg-slate-700 text-5xl font-bold border-black border-solid border-2 rounded-full hover:opacity-55' onClick={handleAdd}>+</button>
                        {
                            isClicked ? <AddSubTask /> : ''
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ViewTodo