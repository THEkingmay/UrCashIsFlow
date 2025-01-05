import { useState } from "react";
import Pages from "./pagesRoute/PageRoute";
import { DataProvider } from "./datacontext/DataConPro";

export default function App(){
  return(
    <DataProvider>
          <Pages/>
    </DataProvider>
  )
}