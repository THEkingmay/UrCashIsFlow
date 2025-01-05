import { useEffect,useState } from "react"
import { useContext } from "react"
import { DataContext } from "../datacontext/DataConPro"
import { Link } from "react-router"
const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December","ALL"];

export default function ShowInDay(){
    console.log('ShowCash render')
    const [income , setIncome ] = useState(0)
    const [expense , setExpense ]= useState(0)
    const [sumCash,setSumcash] = useState(0)
    const {currDay,currMonth,currYear} = useContext(DataContext)

    useEffect(()=>{
        const DATA = JSON.parse(localStorage.getItem('STORAGE_DATA'))||[]
        console.log("DATA : ",DATA)
        let tmpIncome =0
        let tmpExpense= 0
        DATA.forEach(data => {
            if(data.currDay===currDay && data.currMonth===currMonth && data.currYear===currYear){
                if(data.isExpense) tmpExpense+=Number(data.amount)
                else if(!data.isExpense) tmpIncome += Number(data.amount)
            }
        });
        setExpense(tmpExpense)
        setIncome(tmpIncome)
        setSumcash(tmpIncome-tmpExpense)
    },[])

    return(
        <div className="p-3  w-full">
            <div className="flex w-full px-5 pt-3 ">
            <div className='m-2 border-2 border-red-500 rounded w-1/2 bg-red-100 p-10 flex flex-col  justify-center items-center text-red-500 '>
                <div>Expense</div>
                <div>{expense}</div>
            </div> 
            <div className="m-2 border-2 border-green-500  rounded w-1/2 bg-green-100 p-10  flex flex-col justify-center items-center text-green-500">
                <div >Income</div>
                <div>{income}</div>
            </div>
        </div>
        <div className=" p-2 w-full flex items-center justify-end mr-8 ">
           <span className={`${sumCash<0?'text-red-500':'text-green-500'}`}> Today total : {sumCash}</span>
           <Link to={`/history/${currYear}/${MONTH[currMonth]}/${currDay}`}><button className="ml-3 underline">History</button></Link>
        </div>
        </div>
    )
}