import { useState } from "react"
import { ACTIONS } from "../App"
import {BiEdit} from "react-icons/bi"
import {TiTickOutline} from "react-icons/ti"
import {MdOutlineDeleteForever} from "react-icons/md"
import {IoCloseCircleSharp} from "react-icons/io5"


export const Todo = ({todo, dispatch}) =>{
    const [newName, setNewName] = useState(todo.name)
    const [description, setDescription] = useState(todo.description)
    const [change, setChange] = useState(false)

    const handleChange = (e) =>{
        e.preventDefault()
        dispatch({type : ACTIONS.CHANGE_INFO, payload : {description:description,newName:newName,id:todo.id}})
        setChange(!change)
    }

    console.log(change)


    return(
        <>
            <div style={todo.complete?{backgroundColor:"green",color:"black"}:{}} className="todo">
                <p className="todo_name" style={{color:todo.complete?"#AAA":"#000"}}>{todo.name}<p style={{fontSize:"1vw"}}>{todo.complete?"*completed*":""}</p></p>
                <p className="todo_description">{todo.description}</p>
                <div className="todo_handlers">
                    <button onClick={() => dispatch({type:ACTIONS.TOGGLE_TODO,payload:{id:todo.id}})}><TiTickOutline className="todo_actions"/></button>
                    <button onClick={() => dispatch({type:ACTIONS.DELETE_TODO,payload:{id:todo.id}})}><MdOutlineDeleteForever className="todo_actions"/></button>
                    <button onClick={() => setChange(!change)}><BiEdit className="todo_actions"/></button>
                </div>
            </div>
            <div className={`change_outer ${change?"show":""}`}>
                <div className="change_inner">
                    <div onClick={()=>setChange(!change)} className="exit"><IoCloseCircleSharp color="red" size={20}/></div>
                    <form onSubmit={handleChange}>
                        <div className="input_block">
                            <label>Name:</label>
                            <input
                                type="text"
                                value={newName}
                                onChange={e=>setNewName(e.target.value)}
                            />
                        </div>
                        <div className="input_block">
                            <label>Description:</label>
                            <input
                                type="text"
                                value={description}
                                onChange={e=>setDescription(e.target.value)}
                            />
                        </div>
                        <input
                            type="submit"
                            name="action"
                            value="Submit"
                            className="submition"
                        />
                    </form>
                </div>

            </div>


        </>

    )
}