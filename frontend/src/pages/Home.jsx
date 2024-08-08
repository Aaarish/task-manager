import React from 'react'
import { CardColumn } from '../components'
import { useNavigate } from 'react-router-dom';

function Home() {
    const nav = useNavigate()

    const handleAdd = () => {
        nav('/add')
    }

    return (
        <div className="flex justify-center relative">
            <CardColumn heading={"TODO"} />
            <CardColumn heading={"IN_PROGRESS"} />
            <CardColumn heading={"DONE"} />
            <div className='fixed bottom-[5%] right-[5%]'>
                <button className='w-20 h-20 text-center text-white bg-slate-700 text-5xl font-bold border-black border-solid border-2 rounded-full hover:opacity-55' onClick={handleAdd}>+</button>
            </div>
        </div>

    )
}

export default Home