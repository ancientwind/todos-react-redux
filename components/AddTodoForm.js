import React from 'react'

let input

const AddTodoForm = ({ submitAddTodo }) => (
		<div>
	      <form onSubmit={e => {
	        e.preventDefault()
	        if (!input.value.trim()) {
	          return
	        }
	        submitAddTodo(input.value)
	        input.value = ''
	      }}>
	        <input ref={node => {
	        	console.log(node)
	          input = node
	        }} />
	        <button type="submit">
	          Add Todo
	        </button>
	      </form>
	    </div>
	)

export default AddTodoForm