import { createContext , useState , useEffect } from "react";

const DataContext = createContext('')

function DataProvider({children}){
    const now = new Date()
    const currDay = now.getDate();
    const currMonth = now.getMonth();
    const currYear = now.getFullYear();
    const addItem = (newItem) =>{
       const ALL_DATA =JSON.parse( localStorage.getItem('STORAGE_DATA'))||[]
       console.log('Add new item : ',newItem)
       localStorage.setItem('STORAGE_DATA',JSON.stringify( [...ALL_DATA,newItem]))
    }
    const deleteItem = () =>{}
    const updateItem =()=>{}
    return(
        <DataContext.Provider value={{addItem,deleteItem,updateItem,currDay,currMonth,currYear}}>
            {children}
        </DataContext.Provider>
    )
}

export {DataContext , DataProvider}