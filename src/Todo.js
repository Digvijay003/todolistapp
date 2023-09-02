import React from 'react'

export default function Todo({ todo, toggleTodo,handleDeleteTodos }) {
  function handleTodoClick() {
    toggleTodo(todo.id)
  }
  
  return (
    <div>
      <label>
        <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} className='checkboxInput'/>
        {todo.name}
        <button className='delete-button'onClick={()=>handleDeleteTodos(todo.id)}>Delete</button>
      </label>
    </div>
  )
}
