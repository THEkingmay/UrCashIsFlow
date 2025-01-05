import { BrowserRouter , Routes , Route , Link  } from "react-router";
import { useContext } from "react";
import { DataContext } from "../datacontext/DataConPro";
import Home from "../Pages/Home";
import History from "../Pages/History";
import { YearList } from "../components/Yearlist";
import { MonthList } from "../components/Monthlist";
import { Daylist } from "../components/Daylist";

export default function Pages(){
    console.log('Route page render')
    const {currDay , currMonth , currYear}= useContext(DataContext)
    const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return(
        <div >
            <BrowserRouter>
                <div className="border flex justify-between">
                    <Link  to='/'><button className="border-r  p-5">Home</button></Link>
                    <div className="p-5">{currDay}-{MONTH[currMonth]}-{currYear}</div>
                    <Link to='/history'><button className="border-l p-5">History</button></Link>
                </div>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path="/history" element={<History/>}>
                            <Route path=":year" element={ <YearList/>}/>
                            <Route path=":year/:month" element={<MonthList/>}/>
                            <Route path=":year/:month/:day" element={<Daylist/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>        
        </div>
    )
}