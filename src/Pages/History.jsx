import { Outlet } from "react-router"
import { useState,useCallback,useEffect} from "react"
import { Link } from "react-router"
import WarningSelYear from "../components/WarningSelYear"
import { useLocation,useParams } from "react-router"

const DATA = JSON.parse(localStorage.getItem('STORAGE_DATA'))|| []
export default function History(){
    console.log('History rerender')
    const {year , month ,day} = useParams()
    const [selectedYear , setSelYear ] = useState(year||'Year')
    const [selectedMonth , setSelMonth ] = useState(month||'Months')
    const [selectedDay , setSelDay ] = useState(day||'Days')
    const [isWarning , setWarning ] = useState(false)
    const [PATH,setPath] =useState(useLocation().pathname)
    const forYear = useCallback (() =>{
        let currYear=0
        return DATA.filter((data)=>{
                if(data.currYear !== currYear){
                    currYear = data.currYear
                    return true
                }
                return false
            }).map((data)=>{
                return <li onClick={()=>setSelYear(data.currYear)}  key={data.currYear}><a>{data.currYear}</a></li>
                }
            )
    })
    const forMonth =useCallback ( () =>{
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months.map(m=>{
            return <li key={m} onClick={()=>{setSelMonth(m);window.scrollTo({
                top: 0,      
                behavior: 'smooth' 
              });}}><a>{m}</a></li>
        })
    })
    const forDay = useCallback (() =>{
        const days = []
        for(let i=0;i<=31;i++){if(i!==0)days.push(i) ;else days.push('ALL')}
        return days.map(d=>{
            return <li key={d} onClick={()=>{setSelDay(d);window.scrollTo({
                top: 0,      
                behavior: 'smooth' 
              });}}><a>{d}</a></li>
        })
    })
    useEffect(()=>{
        if(selectedYear!=='Year'){
            if(selectedMonth!=='Months' && selectedMonth!=='ALL'){
                console.log('Month selected')
                if(selectedDay!=='Days' && selectedDay!=='ALL'){
                    console.log('Day selected')
                    setPath(`/history/${selectedYear}/${selectedMonth}/${selectedDay}`)
                    return
                }
                setPath(`/history/${selectedYear}/${selectedMonth}`)
                return
            }
            setPath(`/history/${selectedYear}`)
        }
        console.log("Current path : ",PATH)
    },[selectedDay,selectedMonth,selectedYear])
    const NOT_SELECT = () =>{
        return(
            <div>
                Select at least year
            </div>
        )
    }
    return(
        <div>
            {isWarning && <WarningSelYear/>}
            <div className="border-b">
                <div className="flex  items-center p-3">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn m-1">{selectedYear}</div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            {forYear()}
                        </ul>
                    </div>
                    <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn m-1">{selectedMonth}</div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li key={'all_month'} onClick={()=>{setSelMonth('ALL');window.scrollTo({
                                    top: 0,      
                                    behavior: 'smooth' 
                                });}}><a>ALL</a></li>
                                {forMonth()}
                            </ul>
                    </div>
                    <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn m-1">{selectedDay}</div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            {forDay()}
                            </ul>
                    </div>
                    <div className=" w-full ">
                        <Link to={PATH}><button onClick={()=>{
                                if(selectedYear==='Year'){setWarning(true);setTimeout(() => {
                                    setWarning(false)
                                }, 1500);}
                        }} className="btn btn-neutral w-full">Search</button></Link>
                </div>
                </div>
            </div>
            <div className="p-4">
                <Outlet/>
                {PATH=='/history' && NOT_SELECT()}
            </div>
        </div>
    )
}