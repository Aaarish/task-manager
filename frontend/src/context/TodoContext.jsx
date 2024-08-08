import React, { createContext, useContext, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

const todoContext = createContext()

export default function TodoContext({ children }) {
    // custom attributes and methods that needs to be stored in application context

    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState({})

    const baseUrl = 'http://localhost:9090/api/v1/tasks'

    const addTodo = async (todo) => {
        try {
            let res = await fetch(`${baseUrl}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(todo)
            })
            let resJson = await res.json()

            return resJson;
        } catch (ex) {
            console.log(ex)
        }
    }

    const getTodos = async () => {
        try {
            let res = await fetch(`${baseUrl}`)
            let resJson = await res.json()

            return resJson;
        } catch (ex) {
            console.log(ex)
        }
    }

    const getTodo = async (todoId) => {
        try {
            let res = await fetch(`${baseUrl}/${todoId}`)
            let resJson = await res.json()

            return resJson;
        } catch (ex) {
            console.log(ex)
        }
    }

    const editTodo = async (todoId, todo) => {

        // api call to edit todo in db
        try {
            let res = await fetch(`${baseUrl}/${todoId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(todo)
            })
        } catch (error) {
            console.log(error);
        }
    }

    const deleteTodo = async (todoId) => {
        let res = await fetch(`${baseUrl}/${todoId}`, {
            method: 'DELETE'
        })
    }

    const appendSubTask = async (todoId, heading, desc) => {
        try {
            let res = await fetch(`${baseUrl}/sub/${todoId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'heading': heading, 'desc': desc })
            })

            let resJson = await res.json()

            return resJson
        } catch (error) {
            console.log(error)
        }
    }

    const removeSubTask = async (todoId, subTaskId) => {
        try {
            let res = await fetch(`${baseUrl}/${todoId}/sub/${subTaskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <todoContext.Provider value={{ addTodo, getTodos, getTodo, editTodo, deleteTodo, appendSubTask, removeSubTask }}>
            {children}
        </todoContext.Provider>
    )
}

export const useTodoContext = () => {
    return useContext(todoContext)
}
