"use client"

import { z } from "zod"     // for validation
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Form, FormControl } from "../ui/form"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"

import CustomFormFieldTemplate from "../CustomFormFieldTemplate"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from '../../lib/validation'
import { createUser } from "@/lib/actions/member.actions"
import { useRouter } from "next/navigation"
import { FormFieldType } from "./MemberForm"

import { GenderOptions } from "@/constants"

const RegisterForm = ({ user: { user:User } }) => {
  const iconExampleTwo = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXN3b3JkcyI+PHBvbHlsaW5lIHBvaW50cz0iMTQuNSAxNy41IDMgNiAzIDMgNiAzIDE3LjUgMTQuNSIvPjxsaW5lIHgxPSIxMyIgeDI9IjE5IiB5MT0iMTkiIHkyPSIxMyIvPjxsaW5lIHgxPSIxNiIgeDI9IjIwIiB5MT0iMTYiIHkyPSIyMCIvPjxsaW5lIHgxPSIxOSIgeDI9IjIxIiB5MT0iMjEiIHkyPSIxOSIvPjxwb2x5bGluZSBwb2ludHM9IjE0LjUgNi41IDE4IDMgMjEgMyAyMSA2IDE3LjUgOS41Ii8+PGxpbmUgeDE9IjUiIHgyPSI5IiB5MT0iMTQiIHkyPSIxOCIvPjxsaW5lIHgxPSI3IiB4Mj0iNCIgeTE9IjE3IiB5Mj0iMjAiLz48bGluZSB4MT0iMyIgeDI9IjUiIHkxPSIxOSIgeTI9IjIxIi8+PC9zdmc+`
  const iconExampleThree = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXBob25lIj48cGF0aCBkPSJNMjIgMTYuOTJ2M2EyIDIgMCAwIDEtMi4xOCAyIDE5Ljc5IDE5Ljc5IDAgMCAxLTguNjMtMy4wNyAxOS41IDE5LjUgMCAwIDEtNi02IDE5Ljc5IDE5Ljc5IDAgMCAxLTMuMDctOC42N0EyIDIgMCAwIDEgNC4xMSAyaDNhMiAyIDAgMCAxIDIgMS43MiAxMi44NCAxMi44NCAwIDAgMCAuNyAyLjgxIDIgMiAwIDAgMS0uNDUgMi4xMUw4LjA5IDkuOTFhMTYgMTYgMCAwIDAgNiA2bDEuMjctMS4yN2EyIDIgMCAwIDEgMi4xMS0uNDUgMTIuODQgMTIuODQgMCAwIDAgMi44MS43QTIgMiAwIDAgMSAyMiAxNi45MnoiLz48L3N2Zz4=`

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);

    try {
     const userData = { name, email, phone };
     const user = await createUser(userData);
     
     if(user){
       router.push(`/members/${user.$id}/register`)
     } 

    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div className="bg-gray-900 py-1 px-4 rounded-3xl">
      <h1 className="text-3xl pb-4">Registration Form</h1>

      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="text-yellow-400 mb-12">
          <h1 className="header">Welcome!</h1>
          <p className="text-gray-400">We have a long way to go. Hurry now to add your information and get started soon!</p>
        </section>

        <section className="text-yellow-400 mb-9 space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub_header">Personal Information</h2>
          </div>
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

        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormFieldTemplate
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name='birthDate'
            label='Date of Birth'
            iconSource={iconExampleTwo}
            iconAlt='user'
          />

        </div>

        <CustomFormFieldTemplate
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name='gender'
          label='Gender'
          renderSkeleton={(field) => (
            <FormControl>
              <RadioGroup className="flex h-11 gap-6 xl:justify-between"
                onValueChange={field.onChange} defaultValue={field.value}
              >
                {GenderOptions.map((option) => (
                  <div key={option} className="radio_group">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className='cursor-pointer'>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
          )}
          iconSource={iconExampleThree}
          iconAlt="phone"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormFieldTemplate
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='address'
            label='Address'
            placeholder='1234 5th Street 6 Ave'
            iconSource={iconExampleTwo}
            iconAlt='user'
          />
          
          <CustomFormFieldTemplate
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='occupation'
            label='Occupation'
            placeholder='Adventurer'
            iconSource={iconExampleTwo}
            iconAlt='user'
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormFieldTemplate
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='emergencyContactName'
            label='Emergency Contact Name'
            placeholder="Bobby Redfield"
            iconSource={iconExampleThree}
            iconAlt="phone"
          />
          <CustomFormFieldTemplate
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name='emergencyContactNumber'
            label='Emergency Contact Number'
            placeholder="(987) 654-321"
            iconSource={iconExampleThree}
            iconAlt="phone"
          />
        </div>

        {/* <div className="flex flex-col gap-6 xl:flex-row">
          
        </div> */}

        {/* <div className="flex flex-col gap-6 xl:flex-row">
          
        </div> */}

        <SubmitButton isLoading={isLoading}>Start Here</SubmitButton>

      </form>
    </Form>
    </div>
  )
}

export default RegisterForm