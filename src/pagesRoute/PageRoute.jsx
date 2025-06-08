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
    
    const handelExport = () => {
        console.log("Export file data");

        // ดึงข้อมูลจาก localStorage
        const ALL_DATA = JSON.parse(localStorage.getItem('STORAGE_DATA')) || [];

        // แปลงข้อมูลเป็น string
        const jsonString = JSON.stringify(ALL_DATA, null, 2); // format ให้อ่านง่าย

        // สร้าง Blob (ไฟล์จำลองใน memory)
        const blob = new Blob([jsonString], { type: "application/json" });

        // สร้างลิงก์ดาวน์โหลด
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "data.json"; // ชื่อไฟล์ที่จะโหลด
        document.body.appendChild(link);
        link.click();

        // ลบลิงก์ออกหลังจากคลิก
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    
    return(
        <div >
            <BrowserRouter>
                <div className="border flex justify-between">
                    <Link  to='/'><button className="border-r  p-5">Home</button></Link>
                    <div className="flex">
                        <div className="p-5">{currDay}-{MONTH[currMonth]}-{currYear}</div>
                        <div><button onClick={()=>handelExport()} className="btn mt-2">export data</button></div>
                    </div>
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