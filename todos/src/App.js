import './App.css';
import {useReducer, useState} from "react"
import { Todo } from './components/Todo';
import { Completed } from './components/Completed';

  export const ACTIONS = {
    ADD_TODO : "add-todo",
    TOGGLE_TODO : "toggle-todo",
    DELETE_TODO : "delete-todo",
    CHANGE_INFO : "change-info",
    DELETE_COMPLETED : "delete-completed",
    RETURN_COMPLETED : "return-completed"
  }


const reducer = (todos, action) =>{
  switch (action.type){
    case ACTIONS.ADD_TODO:
      return {"todos":[...todos.todos, newTodo(action.payload.name)],"completed":[...todos.completed]}

    case ACTIONS.CHANGE_INFO:
      return {"todos":todos.todos.map(todo =>{
        if(todo.id === action.payload.id){
          console.log(action.payload.newName)
          return {...todo, name:action.payload.newName, description:action.payload.description}
        }
        return todo
      }),"completed":[...todos.completed]}

    case ACTIONS.TOGGLE_TODO:
      return {
        "completed": [...todos.completed,...todos.todos.filter(todo=>todo.id === action.payload.id)],
        "todos":todos.todos.filter(todo => todo.id !==action.payload.id)
      }

    case ACTIONS.DELETE_TODO:
      return {"todos":todos.todos.filter(todo => todo.id !==action.payload.id),"completed":[...todos.completed]}

    case ACTIONS.DELETE_COMPLETED:
      return {"todos":todos.todos,"completed":todos.completed.filter(todo => todo.id !==action.payload.id)}

    case ACTIONS.RETURN_COMPLETED:
      return {"todos":[...todos.todos,...todos.completed.filter(todo=>todo.id === action.payload.id)],
       "completed" :todos.completed.filter(todo => todo.id !==action.payload.id)}

    default:
      return todos
  }
}


const newTodo = (name) =>{
  return { id: Date.now(), name:name, description:""}
}


function App() {
  const [todos, dispatch] = useReducer(reducer, {"todos":[],"completed":[]})
  const [name, setName] = useState("")

  const handleSubmit = (e) =>{
    e.preventDefault()
    dispatch({type : ACTIONS.ADD_TODO, payload : {name:name}})
    console.log(todos)
    setName("")
  }

  console.log(todos)

  return (
    <>
      <div className="App">
        <header>Todos</header>
        <form className='main_input' onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={e=>setName(e.target.value)}
          />
        </form>
        <div className='todo_header'>
          <h1 className='header_name'>Name</h1>
          <h1 className='header_description'>Description</h1>
          <h1 className='header_actions'>Actions</h1>
        </div>
        <h1 className='header_completed'>Completed</h1>
        <div className='todos'>
          {todos.todos.map(todo=>{
            return <Todo key={todo.id} todo={todo} dispatch = {dispatch}/>
          })}
        </div>
        <div className='completed'>
          {todos.completed.map(todo=>{
            return <Completed todo={todo} dispatch={dispatch} />
          })}
        </div>
      </div>
    </>
  );
}

export default App;
