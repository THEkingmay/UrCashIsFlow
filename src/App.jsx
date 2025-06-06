import { useEffect, useState } from "react";
import Pages from "./pagesRoute/PageRoute";
import { DataProvider } from "./datacontext/DataConPro";

export default function App(){
  useEffect(()=>{
    console.log("TEST PUSH FROM CLONED PROJECT")
  },[])
  return(
    <DataProvider>
          <Pages/>
    </DataProvider>
  )
}