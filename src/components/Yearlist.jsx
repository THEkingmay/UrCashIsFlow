import { useParams } from "react-router"
import { Link } from "react-router"
import { useEffect } from "react";

function YearList(){
    const {year} = useParams()
    useEffect(() => {
                window.scrollTo(0, 0);
            }, []); // เรียกตอนโหลดครั้งแรก
    const getData =  () => {
        const DATA = JSON.parse(localStorage.getItem("STORAGE_DATA"))||[]
        return DATA.filter(data=>{
            if(data.currYear == year){
                // console.log(data)
                return data 
            }
        })
    }

    const calInYear = () =>{
        const DATA = getData()
        let total = 0
        DATA.map(data=>{
            if(data.isExpense) total-=Number(data.amount)
            else total+=Number(data.amount)
        })
        return(
            <span className={`mr-4 border-b-4 ${total>0?"border-green-200":"border-red-200"}` }>Total in year {total}</span>
        )
    }

    const getInMonth = () =>{
        const DATA = getData()
        const tmpMonth = [{ month: 'January', total: 0 }, { month: 'February', total: 0 }, { month: 'March', total: 0 }, { month: 'April', total: 0 }, { month: 'May', total: 0 }, { month: 'June', total: 0 }, { month: 'July', total: 0 }, { month: 'August', total: 0 }, { month: 'September', total: 0 }, { month: 'October', total: 0 }, { month: 'November', total: 0 }, { month: 'December', total: 0 }];
        let selMonth = 0
        for(let i=0 ; i<DATA.length; i++){
            if(Number(DATA[i].currMonth)==selMonth){
                if(DATA[i].isExpense)
                tmpMonth[selMonth].total -= Number(DATA[i].amount)
                else                
                tmpMonth[selMonth].total += Number(DATA[i].amount)
            }else{
                selMonth=DATA[i].currMonth
                if(DATA[i].isExpense)
                tmpMonth[selMonth].total -= Number(DATA[i].amount)
                else                
                tmpMonth[selMonth].total += Number(DATA[i].amount)    
            }
        } 
        // console.log(tmpMonth)
        return tmpMonth.map(data=>(
            <Link key={data.month} to={`/history/${year}/${data.month}`}>
                <div className={`flex justify-between p-3 mt-3 border-l-4 shadow ${data.total>=0?'border-green-200':'border-red-200'}`}>
                   <span>{data.month}</span>
                   <span>{data.total}</span> 
                </div>
            </Link>
        ))
    }
    
    return(
        <div className="p-1">
            <div className="flex justify-between">
               <span className="underline"> {year}</span>
               <span>{calInYear()}</span>
            </div>
            <div>
                {getInMonth()}
            </div>
        </div>
    )
}
export {YearList}