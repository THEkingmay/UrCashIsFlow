import { useParams } from "react-router"
import { useState } from "react";

function Daylist(){
    const [isSee , setIsSee] = useState(false)
    const {year , month , day } = useParams()
    const [numItem , setNumItem ] = useState(0)
    const getData = () =>{
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const DATA = JSON.parse(localStorage.getItem("STORAGE_DATA"))||[]
        const month_idx = months.findIndex(m=>m===month)
        const checkType= (type) =>{
            if(type==='food')return 'border-l-yellow-200'
            if(type==='stuff')return 'border-l-blue-200'
            if(type==='travel')return  'border-l-gray-200'
        }
        const checkExpense = (isExpense) =>{
            if(isExpense)return 'border-r-red-200'
            else return 'border-r-green-200'
        }
        return DATA.map((data)=>{
            console.log(data.currDay,"",data.currMonth,"",data.currYear )
            // console.log(day,"",month_idx,"",year)
            if(data.currDay==day && data.currMonth==month_idx && data.currYear == year){
                // console.log(data)
                return(
                    <div key={data.id} className={`shadow border-l-8 border-r-8 p-3 mt-1 ${checkType(data.selectType)} ${checkExpense(data.isExpense)}`}>
                        <p>{data.selectType}</p>
                        <p>{data.description}</p>
                        <p>{data.amount} Baht</p>
                    </div>
                )
            }
        })
    }
    const checkItem = () =>{
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const DATA = JSON.parse(localStorage.getItem("STORAGE_DATA"))||[]
        const month_idx = months.findIndex(m=>m===month)
        let n= 0
        let expenseItem=0
        let incomeItem = 0
        let income =0
        let expense = 0

        let ex_food_num = 0
        let ex_stuff_num = 0
        let ex_travel_num = 0
        let ex_other_num = 0
        let in_food_num = 0
        let in_stuff_num = 0
        let in_travel_num = 0
        let in_other_num = 0

        let ex_food = 0
        let ex_stuff = 0
        let ex_travel = 0
        let ex_other = 0
        let in_food = 0
        let in_stuff = 0
        let in_travel = 0
        let in_other= 0
        DATA.forEach(data=>{
            console.log(data)
            if(data.currDay==day && data.currMonth==month_idx && data.currYear == year){
                ++n
                if(data.isExpense){
                    expenseItem++;
                    expense+=Number(data.amount)
                    if(data.selectType==='food'){ ex_food_num++ ; ex_food+=Number(data.amount)}
                    else if(data.selectType==='travel'){ex_travel_num++ ; ex_travel+=Number(data.amount)}
                    else if(data.selectType==='stuff'){ex_stuff_num++ ; ex_stuff+= Number(data.amount)}
                    else if(data.selectType==='other'){ex_other_num++ ; ex_other+= Number(data.amount)}
                }else{
                    incomeItem++; 
                    income+=Number(data.amount)
                    if(data.selectType==='food'){ in_food_num++; in_food+=Number(data.amount)}
                    else if(data.selectType==='travel'){ in_travel_num++; in_travel+=Number(data.amount)}
                    else if(data.selectType==='stuff'){in_stuff_num++; in_stuff+=Number(data.amount)}
                    else if(data.selectType==='other'){in_other_num++; in_other+=Number(data.amount)}
                }
            }
        })
        return (
            <div className="flex flex-col">
                <div className=' w-full p-2'>
                    <div>{n} items</div>
                    <div>{expenseItem} Expesense - {expense} baht</div>
                    <div>{incomeItem} Income - {income} baht</div>
                    <div className={`border rounded p-1 ${income-expense>0?'border-green-500':'border-red-500'}`}>Total {income-expense} baht</div>
                </div>
                <div onClick={()=>setIsSee(true)} className={`${isSee?'hidden':''} shadow p-1 m-1 w-1/3 rounded flex justify-center`}>More details </div>
                <div onClick={()=>setIsSee(false)}  className={`${isSee?'':'hidden'} flex shadow`}>
                   <div className=" w-full p-2 border-l-4 border-red-200">
                        <div className="underline">Expense</div>
                        <div className="border-b">Food {ex_food_num}  items {ex_food} B</div>
                        <div className="border-b">Stuff {ex_stuff_num}  items {ex_stuff} B</div>
                        <div className="border-b">Travel {ex_travel_num}  items {ex_travel} B</div>
                        <div>Other {ex_other_num}  items {ex_other} B</div>
                    </div>
                   <div className="w-full p-2  border-l-4 border-green-200">
                        <div className="underline">Income</div>
                        <div className="border-b">Food {in_food_num} items {in_food} B</div>
                        <div className="border-b">Stuff {in_stuff_num} items {in_stuff} B</div>
                        <div className="border-b">Travel {in_travel_num} items {in_travel} B</div>
                        <div>Other {in_other_num} items {in_other} B</div>
                    </div>
                </div>
            </div>
        )
    }
    return(
        <div>
            <div className=" p-1"><span className="underline">{day}-{month}-{year} </span>{checkItem()}</div>
            {getData()}
        </div>        
    )
}
export {Daylist}