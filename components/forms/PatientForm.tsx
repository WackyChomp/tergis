"use client"

import { z } from "zod"     // for validation
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "../ui/form"
import CustomFormFieldTemplate from "../CustomFormFieldTemplate"


const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})


const PatientForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  
  return (
    <div>
      <h1 className="text-3xl pb-4">Patient Form</h1>

      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">
        <section className="text-yellow-400 mb-12 space-y-4">
          <h1 className="text-lg">Hello there!</h1>
          <p className="">Schedule an appointment now!</p>
        </section>

        <CustomFormFieldTemplate
          control={form.control}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  )
}

export default PatientForm