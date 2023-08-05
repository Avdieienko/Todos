import './App.css';
import {useReducer, useState} from "react"
import { Todo } from './components/Todo';

  export const ACTIONS = {
    ADD_TODO : "add-todo",
    TOGGLE_TODO : "toggle-todo",
    DELETE_TODO : "delete-todo",
    CHANGE_INFO : "change-info"
  }


const reducer = (todos, action) =>{
  switch (action.type){
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)]

    case ACTIONS.CHANGE_INFO:
      return todos.map(todo =>{
        if(todo.id === action.payload.id){
          console.log(action.payload.newName)
          return{...todo, name:action.payload.newName, description:action.payload.description}
        }
        return todo
      })

    case ACTIONS.TOGGLE_TODO:
      return todos.map(todo =>{
        if(todo.id === action.payload.id){
          return{...todo, complete:!todo.complete}
        }
        return todo
      })

    case ACTIONS.DELETE_TODO:
      return todos.filter(todo => todo.id !==action.payload.id)

    default:
      return todos
  }
}


const newTodo = (name) =>{
  return { id: Date.now(), name:name, complete:false, description:""}
}

function App() {
  const [todos, dispatch] = useReducer(reducer, [])
  const [name, setName] = useState("")

  const handleSubmit = (e) =>{
    e.preventDefault()
    dispatch({type : ACTIONS.ADD_TODO, payload : {name:name}})
    setName("")
  }



  return (
    <>
      <div className="App">
        <header>Todos</header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={e=>setName(e.target.value)}
          />
        </form>
        <div className='table_header'>
          <h1 className='header_name'>Name</h1>
          <h1 className='header_description'>Description</h1>
          <h1 className='header_actions'>Actions</h1>
        </div>
        {todos.map(todo=>{
          return <Todo key={todo.id} todo={todo} dispatch = {dispatch}/>
        })}
      </div>
    </>
  );
}

export default App;
