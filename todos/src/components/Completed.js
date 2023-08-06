import {TiArrowBackOutline} from "react-icons/ti"
import {MdOutlineDeleteForever} from "react-icons/md"
import { ACTIONS } from "../App"


export const Completed = ({todo, dispatch}) =>{
    return(
        <div>
            <p>{todo.name}</p>
            <button onClick={()=>dispatch({type:ACTIONS.RETURN_COMPLETED, payload:{id:todo.id}})}><TiArrowBackOutline/></button>
            <button onClick={()=>dispatch({type:ACTIONS.DELETE_COMPLETED, payload:{id:todo.id}})}><MdOutlineDeleteForever/></button>
        </div>
    )
}