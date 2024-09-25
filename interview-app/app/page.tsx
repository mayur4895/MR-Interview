 
import Header from "@/components/Header";
import InitialForm from "@/components/initialForm";
import InitialModal from "@/components/models/InitialModal"; 
import { db } from "@/lib/db";
 
 
 
import { redirect } from "next/navigation";
 

   const  Home = async()=> { 
 
  
 
  return (
    <>
 
 <Header/> 
 <InitialForm/>
    </>
  );
}


export default Home;