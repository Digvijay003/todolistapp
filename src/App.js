import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
//import uuidv4 from 'uuid/v4'
import './App.css'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: Math.floor(Math.random()*1000)+1, name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  function handleDeleteTodos(id){
    const newTodos=todos.filter(todo=>todo.id!==id)
    setTodos(newTodos)

  }

  return (
    <>
    <div className='all-todos'>
     
      <input ref={todoNameRef} type="text" className='inputTodo'/>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Complete</button>
      <TodoList todos={todos} toggleTodo={toggleTodo} handleDeleteTodos={handleDeleteTodos}/>
      <div><span>{todos.filter(todo => !todo.complete).length}</span> left to do</div>
      </div>
    </>
  )
}

export default App;
