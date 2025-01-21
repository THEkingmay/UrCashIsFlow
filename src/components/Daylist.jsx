import { useParams } from "react-router"
import { useState,useEffect } from "react";

function Daylist(){
    console.log("DayList rerender")
    const {year , month , day } = useParams() 
    // const [isSee , setIsSee] = useState(false) # for 1st version
    // const [numItem , setNumItem ] = useState(0) # for 1st version
    // const getData = () =>{
    //     const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //     const DATA = JSON.parse(localStorage.getItem("STORAGE_DATA"))||[]
    //     const month_idx = months.findIndex(m=>m===month)
    //     const checkType= (type) =>{
    //         if(type==='food')return 'border-l-yellow-200'
    //         if(type==='stuff')return 'border-l-blue-200'
    //         if(type==='travel')return  'border-l-gray-200'
    //     }
    //     const checkExpense = (isExpense) =>{
    //         if(isExpense)return 'border-r-red-200'
    //         else return 'border-r-green-200'
    //     }
    //     return DATA.map((data)=>{
    //         // console.log(data.currDay,"",data.currMonth,"",data.currYear )
    //         // console.log(day,"",month_idx,"",year)
    //         if(data.currDay==day && data.currMonth==month_idx && data.currYear == year){
    //             // console.log(data)
    //             return(
    //                 <div key={data.id} className={`shadow border-l-8 border-r-8 p-3 mt-1 ${checkType(data.selectType)} ${checkExpense(data.isExpense)}`}>
    //                     <p>{data.selectType}</p>
    //                     <p>{data.description}</p>
    //                     <p>{data.amount} Baht</p>
    //                 </div>
    //             )
    //         }
    //     })
    // }  # for 1 st version
    // const checkItem = () =>{
    //     const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //     const DATA = JSON.parse(localStorage.getItem("STORAGE_DATA"))||[]
    //     const month_idx = months.findIndex(m=>m===month)
    //     let n= 0
    //     let expenseItem=0
    //     let incomeItem = 0
    //     let income =0
    //     let expense = 0

    //     let ex_food_num = 0
    //     let ex_stuff_num = 0
    //     let ex_travel_num = 0
    //     let ex_other_num = 0
    //     let in_food_num = 0
    //     let in_stuff_num = 0
    //     let in_travel_num = 0
    //     let in_other_num = 0

    //     let ex_food = 0
    //     let ex_stuff = 0
    //     let ex_travel = 0
    //     let ex_other = 0
    //     let in_food = 0
    //     let in_stuff = 0
    //     let in_travel = 0
    //     let in_other= 0
    //     DATA.forEach(data=>{
    //         console.log(data)
    //         if(data.currDay==day && data.currMonth==month_idx && data.currYear == year){
    //             ++n
    //             if(data.isExpense){
    //                 expenseItem++;
    //                 expense+=Number(data.amount)
    //                 if(data.selectType==='food'){ ex_food_num++ ; ex_food+=Number(data.amount)}
    //                 else if(data.selectType==='travel'){ex_travel_num++ ; ex_travel+=Number(data.amount)}
    //                 else if(data.selectType==='stuff'){ex_stuff_num++ ; ex_stuff+= Number(data.amount)}
    //                 else if(data.selectType==='other'){ex_other_num++ ; ex_other+= Number(data.amount)}
    //             }else{
    //                 incomeItem++; 
    //                 income+=Number(data.amount)
    //                 if(data.selectType==='food'){ in_food_num++; in_food+=Number(data.amount)}
    //                 else if(data.selectType==='travel'){ in_travel_num++; in_travel+=Number(data.amount)}
    //                 else if(data.selectType==='stuff'){in_stuff_num++; in_stuff+=Number(data.amount)}
    //                 else if(data.selectType==='other'){in_other_num++; in_other+=Number(data.amount)}
    //             }
    //         }
    //     })
    //     return (
    //         <div className="flex flex-col">
    //             <div className=' w-full p-2'>
    //                 <div>{n} items</div>
    //                 <div>{expenseItem} Expesense - {expense} baht</div>
    //                 <div>{incomeItem} Income - {income} baht</div>
    //                 <div className={`border rounded p-1 ${income-expense>0?'border-green-500':'border-red-500'}`}>Total {income-expense} baht</div>
    //             </div>
    //             <div onClick={()=>setIsSee(true)} className={`${isSee?'hidden':''} shadow p-1 m-1 w-1/3 rounded flex justify-center`}>More details </div>
    //             <div onClick={()=>setIsSee(false)}  className={`${isSee?'':'hidden'} flex shadow`}>
    //                <div className=" w-full p-2 border-l-4 border-red-200">
    //                     <div className="underline">Expense</div>
    //                     <div className="border-b">Food {ex_food_num}  items {ex_food} B</div>
    //                     <div className="border-b">Stuff {ex_stuff_num}  items {ex_stuff} B</div>
    //                     <div className="border-b">Travel {ex_travel_num}  items {ex_travel} B</div>
    //                     <div>Other {ex_other_num}  items {ex_other} B</div>
    //                 </div>
    //                <div className="w-full p-2  border-l-4 border-green-200">
    //                     <div className="underline">Income</div>
    //                     <div className="border-b">Food {in_food_num} items {in_food} B</div>
    //                     <div className="border-b">Stuff {in_stuff_num} items {in_stuff} B</div>
    //                     <div className="border-b">Travel {in_travel_num} items {in_travel} B</div>
    //                     <div>Other {in_other_num} items {in_other} B</div>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // } # for 1st version

    const [isSeeEx , setisSeeEx ]=useState(true)
    const [isSeeFood , setSeeFood] = useState(false)
    const [isSeeStuff , setSeeStuff] = useState(false)
    const [isSeeTravel, setSeeTravel] = useState(false)
    const [isSeeOther , setSeeOther] = useState(false)

    const checkItem = () =>{
        const DATA = getData()
        console.log(DATA.length ,"items")
        return(
            <>
            <div className="flex mt-5">
                <button onClick={()=>setisSeeEx(true)} className={`shadow p-2 px-5 w-1/2 ${isSeeEx?"border-red-300 border-2":""}`}>Expense</button>
                <button onClick={()=>setisSeeEx(false)} className={`shadow p-2 px-5 w-1/2 ${!isSeeEx?"border-green-300 border-2":""}`}>Income</button>
            </div>
            <div>
                <div onClick={()=>letSeeMore('food')} className={`mt-4 border-l-8 border-green-200 shadow`}>
                    <div className="p-5 flex justify-between"><span className="border-b-4  border-green-200">Food</span><span>{getAmount(DATA,'food',isSeeEx)}</span></div>
                    <div className={`${isSeeFood?"":"hidden"}`} ><span>{getItemByType(DATA,'food',isSeeEx)}</span></div>
                </div>
                <div onClick={()=>letSeeMore('stuff')}   className={`mt-4 border-l-8  border-blue-200 shadow`}>
                    <div className="p-5 flex justify-between"><span className="border-b-4  border-blue-200">Stuff</span><span>{getAmount(DATA,'stuff',isSeeEx)}</span></div>
                    <div className={`${isSeeStuff?"":"hidden"}`} ><span>{getItemByType(DATA,'stuff',isSeeEx)}</span></div>
                </div>
                <div onClick={()=>letSeeMore('travel')}  className={`mt-4 border-l-8  border-orange-200 shadow`}>
                    <div className="p-5 flex justify-between"><span className="border-b-4  border-orange-200">Travel</span><span>{getAmount(DATA,'travel',isSeeEx)}</span></div>    
                    <div className={`${isSeeTravel?"":"hidden"}`} ><span>{getItemByType(DATA,'travel',isSeeEx)}</span></div>
                </div>
                <div onClick={()=>letSeeMore('other')}  className={`mt-4 border-l-8  border-black shadow`}>
                    <div className="p-5 flex justify-between"><span className="border-b-4  border-black">Other</span><span>{getAmount(DATA,'other',isSeeEx)}</span></div>
                    <div className={`${isSeeOther?"":"hidden"}`} ><span>{getItemByType(DATA,'other',isSeeEx)}</span></div>
                </div>
            </div>
            </>
        )
    }
    const getData = () =>{
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const DATA = JSON.parse(localStorage.getItem("STORAGE_DATA"))||[]
            const month_idx = months.findIndex(m=>m===month)
            return DATA.filter(data=>{
                if(data.currDay==day && data.currMonth==month_idx && data.currYear == year){
                    // console.log(data)
                    return data 
                }
            })
    }
    const getItemByType = (DATA,type,isExpense)=>{
        return DATA.map(data=>{
            if(data.selectType==type && data.isExpense == isExpense)
                return(
                    <div className={`border-t-4 py-2 px-5`} key={data.id}>
                        <div className="py-2 border-b">Amount : {data.amount} Baht</div>
                        <div className="py-2 border-b">Time : {data.time}</div>
                        <div>Description : {data.description} </div>
                    </div>
                )
        })
    }
    const getAmount = (DATA,type,isExpense) =>{
        let amount=0
        DATA.map(data=>{
             if(data.selectType==type && data.isExpense==isExpense){
                // console.log(data.amount)
                amount+=Number(data.amount)
             }
        })
        return amount
    }
    const calTotalInday = () =>{
        const DATA=  getData()
        let total =0
        DATA.map(d=>{
            if(d.isExpense)
            total-=Number(d.amount)
            else total+=Number(d.amount)
        })
        return(
        <span className={`mr-4 border-b-4 ${total>0?"border-green-200":"border-red-200"}` }>Total {total}</span>
         )
    }
    const letSeeMore = (type) =>{
        switch(type){
            case "food":
                setSeeFood(!isSeeFood)
                setSeeStuff(false)
                setSeeTravel(false)
                setSeeOther(false)
                break
            case "stuff":
                setSeeFood(false)
                setSeeStuff(!isSeeStuff)
                setSeeTravel(false)
                setSeeOther(false)
                break
            case "travel":
                setSeeFood(false)
                setSeeStuff(false)
                setSeeTravel(!isSeeTravel)
                setSeeOther(false)
                break
            case "other":
                setSeeFood(false)
                setSeeStuff(false)
                setSeeTravel(false)
                setSeeOther(!isSeeOther)
                break
        }
    }
    return(
        <div>
            <div className=" p-1">
                <div className="flex justify-between">
                    <span className="underline">
                        {day}-{month}-{year}
                    </span>
                    {calTotalInday()}
                </div>
                {checkItem()}
            </div>
        </div>        
    )
}
export {Daylist}