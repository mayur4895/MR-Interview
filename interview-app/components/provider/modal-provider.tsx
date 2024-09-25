'use client'

import { useEffect, useState } from "react"
 
import InitialModal from "../models/InitialModal"
 
 
 
 
 
  

const ModalProvider = ()=>{

const [isMounted,setisMounted] = useState(false)


useEffect(()=>{
setisMounted(true);
},[setisMounted])

if(!isMounted){
    return null
}

    return(<>
    
    <InitialModal/>
 
 
    </>)
}

export default ModalProvider;