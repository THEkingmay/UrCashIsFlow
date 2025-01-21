import { useState } from "react"
import { useContext } from "react"
import { DataContext } from "../datacontext/DataConPro"
import WarningAlert from "./WarningAlert"
import { v4 as uuidv4 } from 'uuid';

export default function Form(){
    console.log('Form render')
    const {currDay,currMonth,currYear,addItem} = useContext(DataContext)
    const [description , setDescription] = useState('')
    const [amount,setAmout] = useState(0)
    const [isExpense,setIsExpense] = useState(true)
    const [selectType,setSelectType] = useState('')
    const [isWarning , setisWarning ]= useState(false)
    const handleDescription = (e) =>{
        setDescription(e.target.value)
    }
    const handleAmount = (e) =>{
        setAmout(e.target.value)
    }
    const checkAddInForm = (event) =>{
        // event.preventDefault()
        if(amount<=0){
            setisWarning(true)
            setTimeout(()=>{
                setisWarning(false)
            },1500)
            return
        }
        const currentdate = new Date();
        const time = currentdate.getHours() + ":" 
        + currentdate.getMinutes() + ":" + currentdate.getSeconds();

        const newItem = {
            id:uuidv4(),
            description:description||'',
            amount,
            isExpense,
            selectType:selectType||'other',
            currDay,
            currMonth,
            currYear,
            time
        }
       addItem(newItem)
    }
    return(
        <div className=" w-full p-5 border-t">
            {isWarning && <WarningAlert/>}
          <form>
                <input  onChange={()=>handleAmount(event)}  type="number" className="mt-2 input shadow w-full " placeholder="amount (THB.)" />
                <input onChange={()=>handleDescription(event)} className="mt-2 input shadow w-full" type="text" placeholder="description (optional)"/>
                <div className="flex mt-2 justify-evenly p-2">
                    <label className=" flex border-r p-3 w-1/2" >
                         <span className="mr-2">Expense</span>
                        <input onChange={()=>setIsExpense(!isExpense)} name="radioIsincome" type="radio" className="radio checked:bg-red-200" checked={isExpense}/>
                    </label>
                    <label className=" flex p-3 w-1/2">
                         <span className="mr-2">Income</span>
                        <input  onChange={()=>setIsExpense(!isExpense)} name="radioIsincome" type="radio" className="radio checked:bg-green-200" checked={!isExpense}/>
                    </label>
                </div>
                <div  className={`border-t flex justify-between p-2${isExpense?'':'hidden'}`}>
                    <label className="mt-2 flex p-3" >
                         <span className="mr-2">Food</span>
                        <input onChange={(event)=>setSelectType(event.target.value)} name="option" type="radio" className="radio checked:bg-green-200" value={'food'}/>
                    </label>
                    <label className="mt-2 flex p-3" >
                         <span className="mr-2">Stuff</span>
                        <input   onChange={(event)=>setSelectType(event.target.value)} name="option" type="radio" className="radio checked:bg-blue-200" value={'stuff'}/>
                    </label>
                    <label className="mt-2 flex p-3" >
                         <span className="mr-2">Travel</span>
                        <input  onChange={(event)=>setSelectType(event.target.value)} name="option" type="radio" className="radio checked:bg-orange-200" value={'travel'}/>
                    </label>
                    <label className="mt-2 flex p-3" >
                         <span className="mr-2">Other</span>
                        <input  onChange={(event)=>setSelectType(event.target.value)} name="option" type="radio" className="radio" value={'other'}/>
                    </label>
                </div>
                <button onClick={checkAddInForm} type="submit" className=" btn w-full mt-2">Add</button>
          </form>
        </div>
    )
}