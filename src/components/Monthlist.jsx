import { useParams } from "react-router"
import { Link } from "react-router"
import { useEffect } from "react"
function MonthList(){
    console.log('Month list rerender')
    const { month , year } = useParams() 
    useEffect(() => {
            window.scrollTo(0, 0);
        }, []); // เรียกตอนโหลดครั้งแรก
    const getData = () =>{
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const DATA = JSON.parse(localStorage.getItem("STORAGE_DATA"))||[]
        const month_idx = months.findIndex(m=>m===month)
        return DATA.filter(data=>{
            if(data.currMonth==month_idx && data.currYear == year){
                // console.log(data)
                return data 
            }
        })
    }
    const calTotalInMonth = () =>{
        let total = 0
        const DATA = getData()
        console.log('in ',month,year,"have",DATA.length," items")
        DATA.map(data=>{
            if(data.isExpense)total-=(Number)(data.amount)
            else total+=(Number)(data.amount)
        })
        return(
            <span className={`mr-4 border-b-4 ${total>0?"border-green-200":"border-red-200"}` }>Total {total}</span>
         ) 
    }
    const getAllDay = () =>{
        const DATA = getData()
        const tmpArr = []
        for(let i = 0 ; i<=30; i++){
            tmpArr.push(
                {day:i+1 , total : 0}
            )
        }
        let selectDay =1 
        for(let i = 0 ; i< DATA.length ; i++){
            if(DATA[i].currDay == selectDay){
                if(DATA[i].isExpense)tmpArr[selectDay-1].total-=Number(DATA[i].amount)
                else tmpArr[selectDay-1].total+=Number(DATA[i].amount)
            }else{
                selectDay=Number(DATA[i].currDay)
                if(DATA[i].isExpense)tmpArr[selectDay-1].total-=Number(DATA[i].amount)
                else tmpArr[selectDay-1].total+=Number(DATA[i].amount)
            }
        }
        // console.log(tmpArr) //พอได้อาเรย์แล้วก็นำไปสร้างเป็น component
        return tmpArr.map(data => (
            <Link key={data.day}  to={`/history/${year}/${month}/${data.day}`}>
                <div className={`flex justify-between p-3 mt-3 border-l-4 shadow ${data.total>=0?'border-green-200':'border-red-200'}`}>
                    <span>{data.day}</span><span>{data.total}</span>
                </div>
            </Link>
        ));
    } 
    
    return(
        <div className="p-1">
            <div className="flex justify-between">
                <span className='underline'>{ month}-{year}</span>
                <span>{calTotalInMonth()}</span>
            </div>
            <div>
                {getAllDay()}
            </div>
        </div>
    )
}
export {MonthList}