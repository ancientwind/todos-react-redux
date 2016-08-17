import { connect } from 'react-redux'
import { addTodo } from '../actions'
import AddTodoForm from '../components/AddTodoForm'

const mapDispatchToProps = (dispatch) => {
  return {
    submitAddTodo: (input) => {
      dispatch(addTodo(input))
    }
  }
}

const AddTodo = connect(
  null,
  mapDispatchToProps
  )(AddTodoForm)

export default AddTodo
