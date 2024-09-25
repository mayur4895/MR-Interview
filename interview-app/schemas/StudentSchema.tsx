import { z } from "zod";
const phoneRegex =  /^\+?[1-9]\d{1,14}$/;
export const ApplyFormSchema = z.object({
  firstname: z.string().min(1, 'This field is required'),
  position:z.string().min(1,"required"),
  lastname: z.string().min(1, 'This field is required'),
  email: z.string().email('Invalid email address'), 
  phone: z.string().refine((phone) => phoneRegex.test(phone), {
    message: 'Invalid phone number format.',
  }),
    resume: z.string().min(1, {
      message: "Required Resume",
    }),
  })