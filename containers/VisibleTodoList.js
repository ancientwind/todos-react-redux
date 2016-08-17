import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
  }
}

/**
mapStateToProps
tells how to transform the current Redux store state into the props you want to pass to a presentational component;
when Redux store updates, this method will be called.

works like: store.getState() => to props
*/
const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

/**
in addition to reading the state, container components can dispatch actions.
mapDispatchToProps receives the dispatch() and returns callback props that you want to inject into the presentational component.
eg.
we want the VisibalTodoList to inject onTodoClick into TodoList component, and 
we want onTodoClick to dispatch a TOGGLE_TODO action.

*/
const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
