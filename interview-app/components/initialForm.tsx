'use client'
import { ApplyFormSchema } from '@/schemas/StudentSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from './ui/input'
import FileUpload from './ui/FIleUpload'
import { Button } from './ui/button'
const InitialForm = () => {

    
  const form = useForm<z.infer<typeof ApplyFormSchema>>({
    resolver: zodResolver(ApplyFormSchema),
    defaultValues: {
       firstname: "",
       lastname:"",
      email: "",
      phone: "", 
      position: "",
      resume: "",
    },
  })
  

   
 
 
  async function onSubmit(values: z.infer<typeof ApplyFormSchema>) { 
    await axios.post(`/api/save-user/`,values)
       

  }
  return (
    <div className='my-4 flex items-center justify-center w-full h-full '> 
    <div className=' w-[600px]   border p-5'>
    
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
                name="position" 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-800">Position</FormLabel>
                    <FormControl>
                      <Input placeholder="Web devloper" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
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
    </div>
    </div>
  )
}

export default InitialForm
