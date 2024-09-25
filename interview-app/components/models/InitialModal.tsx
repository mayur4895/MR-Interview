'use client'
import { IoCloseOutline } from "react-icons/io5";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
 
 
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
 
 
 
 
 
 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ApplyFormSchema } from "@/schemas/StudentSchema";
import { useModal } from "@/hook/use-modal-store";
import FileUpload from "../ui/FIleUpload";
 



 
const InitialModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "intialModal";
  const router = useRouter();
   

  const form = useForm<z.infer<typeof ApplyFormSchema>>({
    resolver: zodResolver(ApplyFormSchema),
    defaultValues: {
       firstname: "",
       lastname:"",
      email: "",
      phone: "", 
      resume: "",
    },
  })
  

  const handleClose = () => {
    onClose();
  };


   
 
 
  async function onSubmit(values: z.infer<typeof ApplyFormSchema>) { 
         console.log(values)
  }

  const [isopen , setisopen] = useState(false);
  
 


if(!isopen){
    return null;
}

    return(<>
    <Dialog open={isopen} >
        <DialogContent>
          
          <DialogHeader>
            <DialogTitle className="text-xl font-normal">
                Required details
            </DialogTitle>
         
            <DialogClose
              className="absolute top-1 right-3 h-7 w-7 flex items-center justify-center z-10 bg-white"
              onClick={handleClose}
            >
          <IoCloseOutline size={22} />
            </DialogClose>
          </DialogHeader> 
            
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

     

 
               <div className=" grid grid-cols-2 gap-2">
               <FormField
                control={form.control}
                name="firstname"
              
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-800">FirstName</FormLabel>
                    <FormControl>
                      <Input placeholder="jone" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname" 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-800">LastName</FormLabel>
                    <FormControl>
                      <Input placeholder="doe" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
               </div>

               <FormField
                control={form.control}
                name="email"
      
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-800"> Email id</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="name@comany.com"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              /> 

           <FormField
                control={form.control}
                name="phone"
         
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-800">Mobile Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Mobile Number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
  
        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              { !field.value  ? <FormLabel>Upload Resume</FormLabel> : <FormLabel>Uploded Resume</FormLabel> }
              <FormControl>
               <FileUpload  value={field.value} onChange={field.onChange} endpoint="ResumePdf"/>
              </FormControl> 
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit Application</Button>
      </form>
    </Form>      
        </DialogContent>
       
      </Dialog>
    </>
  );
}

export default InitialModal;
