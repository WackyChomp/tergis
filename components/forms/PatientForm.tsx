"use client"

import { z } from "zod"     // for validation
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "../ui/form"
import CustomFormFieldTemplate from "../CustomFormFieldTemplate"
import SubmitButton from "../SubmitButton"
import { useState } from "react"


export enum FormFieldType {     // ensure type validation
  INPUT = 'input',
  TEXTAREA = 'textArea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
}

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})


const PatientForm = () => {
  const iconExampleTwo = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXN3b3JkcyI+PHBvbHlsaW5lIHBvaW50cz0iMTQuNSAxNy41IDMgNiAzIDMgNiAzIDE3LjUgMTQuNSIvPjxsaW5lIHgxPSIxMyIgeDI9IjE5IiB5MT0iMTkiIHkyPSIxMyIvPjxsaW5lIHgxPSIxNiIgeDI9IjIwIiB5MT0iMTYiIHkyPSIyMCIvPjxsaW5lIHgxPSIxOSIgeDI9IjIxIiB5MT0iMjEiIHkyPSIxOSIvPjxwb2x5bGluZSBwb2ludHM9IjE0LjUgNi41IDE4IDMgMjEgMyAyMSA2IDE3LjUgOS41Ii8+PGxpbmUgeDE9IjUiIHgyPSI5IiB5MT0iMTQiIHkyPSIxOCIvPjxsaW5lIHgxPSI3IiB4Mj0iNCIgeTE9IjE3IiB5Mj0iMjAiLz48bGluZSB4MT0iMyIgeDI9IjUiIHkxPSIxOSIgeTI9IjIxIi8+PC9zdmc+`
  const iconExampleThree = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXBob25lIj48cGF0aCBkPSJNMjIgMTYuOTJ2M2EyIDIgMCAwIDEtMi4xOCAyIDE5Ljc5IDE5Ljc5IDAgMCAxLTguNjMtMy4wNyAxOS41IDE5LjUgMCAwIDEtNi02IDE5Ljc5IDE5Ljc5IDAgMCAxLTMuMDctOC42N0EyIDIgMCAwIDEgNC4xMSAyaDNhMiAyIDAgMCAxIDIgMS43MiAxMi44NCAxMi44NCAwIDAgMCAuNyAyLjgxIDIgMiAwIDAgMS0uNDUgMi4xMUw4LjA5IDkuOTFhMTYgMTYgMCAwIDAgNiA2bDEuMjctMS4yN2EyIDIgMCAwIDEgMi4xMS0uNDUgMTIuODQgMTIuODQgMCAwIDAgMi44MS43QTIgMiAwIDAgMSAyMiAxNi45MnoiLz48L3N2Zz4=`

  const [isLoading, setIsLoading] = useState(false);

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
    <div className="bg-gray-900 py-1 px-4 rounded-3xl">
      <h1 className="text-3xl pb-4">Patient Form</h1>

      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">
        <section className="text-yellow-400 mb-12 space-y-4">
          <h1 className="text-lg">Hello there!</h1>
          <p className="">Schedule an appointment now!</p>
        </section>

        <CustomFormFieldTemplate
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name='name'
          label='Full Name'
          placeholder='Enter a NAME'
          iconSource={iconExampleTwo}
          iconAlt='user'
        />

        <CustomFormFieldTemplate
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name='email'
          label='Email Address'
          placeholder='example28@gmail.com'
          iconSource={iconExampleTwo}
          iconAlt='user'
        />

        <CustomFormFieldTemplate
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name='phone'
          label='Phone Number'
          placeholder="(123) 456-789"
          iconSource={iconExampleThree}
          iconAlt="phone"
        />

        <SubmitButton isLoading={isLoading}>Start Here</SubmitButton>

      </form>
    </Form>
    </div>
  )
}

export default PatientForm