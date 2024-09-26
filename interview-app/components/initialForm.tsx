'use client';
import { ApplyFormSchema } from '@/schemas/StudentSchema';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import FileUpload from './ui/FIleUpload';



 interface InitialFormProps{
userId:string
}
const InitialForm = ({userId}:InitialFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof ApplyFormSchema>>({
    resolver: zodResolver(ApplyFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      position: "",
      resume: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof ApplyFormSchema>) {
    try {
      setLoading(true);
      const res = await axios.post(`/api/save-user/`, {
        ...values,
        userId,  
      });

      if (res.data && res.status === 201) {
        toast({
          title: "Saved Data Successfully",
        });
        // Reset all fields, including the resume
        form.reset({
          firstname: '',
          lastname: '',
          email: '',
          phone: '',
          position: '',
          resume: '', // Clear the resume field
        });
      }

      if (res.status === 400) {
        toast({
          title: "User Data already exists",
          variant: "destructive",
        });
        form.reset({
          firstname: '',
          lastname: '',
          email: '',
          phone: '',
          position: '',
          resume: '', // Reset the resume explicitly
        });
      }
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "User data already exists!",
        variant: "destructive",
      });
      // Clear the fields including the resume on error
      form.reset({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        position: '',
        resume: '', // Reset the resume explicitly
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='my-4 flex items-center justify-center w-full h-full '>
      <div className='w-[600px] border p-5'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <FormField
                disabled={loading}
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-800">FirstName</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                disabled={loading}
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-800">LastName</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              disabled={loading}
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-800">Position</FormLabel>
                  <FormControl>
                    <Input placeholder="Web Developer" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              disabled={loading}
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-800">Email ID</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="name@company.com"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              disabled={loading}
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
              disabled={loading}
              control={form.control}
              name="resume"
              render={({ field }) => (
                <FormItem>
                  {!field.value  ? <FormLabel>Upload Resume</FormLabel> : <FormLabel>Uploaded Resume</FormLabel>}
                  <FormControl>
                    <FileUpload value={field.value} onChange={field.onChange} endpoint="ResumePdf" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className='w-48'>
              {loading ? <Loader2 className='animate-spin' /> : 'Submit Application'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default InitialForm;
