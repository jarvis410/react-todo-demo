import React, { useState, useRef, useEffect } from 'react';
import Todo from './Todo'
import uuidv4 from 'uuid/v4'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

export default function TodoList() {
  const todoNameRef = useRef()
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function addTodo(event) {
    const value = todoNameRef.current.value
    if (value === '') return

    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), value: value, completed: false}]
    })
    todoNameRef.current.value = null
  }

  function clearDoneTodo() {
    const incompleteTodos = todos.filter(todo => !todo.completed)
    setTodos(incompleteTodos)
  }

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.completed = !todo.completed
    setTodos(newTodos)
  }

    return (
        <>
            {
                todos.map(todo => {
                    return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />
                })
            }
            <input ref={todoNameRef} type="text" />
            <button onClick={addTodo}>Add</button> <br />
            <button onClick={clearDoneTodo}>Clear Done!</button>
            <div>{todos.filter(todo => !todo.completed).length} left to do</div>
        </>
    )
}
