"use client"

import { z } from "zod"     // for validation
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Form } from "../ui/form"
import { SelectItem } from "../ui/select"

import CustomFormFieldTemplate from "../CustomFormFieldTemplate"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { getAppointmentSchema } from '../../lib/validation'
import { createAppointment } from "@/lib/actions/appointment.actions"
import { useRouter } from "next/navigation"

import { Experts } from "@/constants"


export enum FormFieldType {     // ensure type validation
  INPUT = 'input',
  TEXTAREA = 'textArea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
}


const AppointmentForm = ({ userId, memberId, type } : {
  userId:string;
  memberId: string;
  type: 'create' | 'cancel' | 'schedule';
  }) => {
  const iconExampleTwo = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXN3b3JkcyI+PHBvbHlsaW5lIHBvaW50cz0iMTQuNSAxNy41IDMgNiAzIDMgNiAzIDE3LjUgMTQuNSIvPjxsaW5lIHgxPSIxMyIgeDI9IjE5IiB5MT0iMTkiIHkyPSIxMyIvPjxsaW5lIHgxPSIxNiIgeDI9IjIwIiB5MT0iMTYiIHkyPSIyMCIvPjxsaW5lIHgxPSIxOSIgeDI9IjIxIiB5MT0iMjEiIHkyPSIxOSIvPjxwb2x5bGluZSBwb2ludHM9IjE0LjUgNi41IDE4IDMgMjEgMyAyMSA2IDE3LjUgOS41Ii8+PGxpbmUgeDE9IjUiIHgyPSI5IiB5MT0iMTQiIHkyPSIxOCIvPjxsaW5lIHgxPSI3IiB4Mj0iNCIgeTE9IjE3IiB5Mj0iMjAiLz48bGluZSB4MT0iMyIgeDI9IjUiIHkxPSIxOSIgeTI9IjIxIi8+PC9zdmc+`
  const iconExampleThree = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXBob25lIj48cGF0aCBkPSJNMjIgMTYuOTJ2M2EyIDIgMCAwIDEtMi4xOCAyIDE5Ljc5IDE5Ljc5IDAgMCAxLTguNjMtMy4wNyAxOS41IDE5LjUgMCAwIDEtNi02IDE5Ljc5IDE5Ljc5IDAgMCAxLTMuMDctOC42N0EyIDIgMCAwIDEgNC4xMSAyaDNhMiAyIDAgMCAxIDIgMS43MiAxMi44NCAxMi44NCAwIDAgMCAuNyAyLjgxIDIgMiAwIDAgMS0uNDUgMi4xMUw4LjA5IDkuOTFhMTYgMTYgMCAwIDAgNiA2bDEuMjctMS4yN2EyIDIgMCAwIDEgMi4xMS0uNDUgMTIuODQgMTIuODQgMCAwIDAgMi44MS43QTIgMiAwIDAgMSAyMiAxNi45MnoiLz48L3N2Zz4=`

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  const AppointmentFormValidation = getAppointmentSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryExpert: "",
      schedule: new Date(),
      reason: "",
      note: "",
      cancellationReason: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);

    let status;
    switch (type){
      case 'schedule':
        status = 'scheduled';
        break;
      case 'cancel':
        status = 'cancelled';
        break;
      default:
        status = 'pending';      
        break;
    }

    try{
      if(type === 'create' && memberId){
        const appointmentData = {
          userId,
          member: memberId,
          primaryExpert: values.primaryExpert,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status as Status,
        }
        const appointment = await createAppointment(appointmentData)   // send to backend

        if(appointment){
          form.reset();
          router.push(`/members/${userId}/new-appointment/success?appointmentId=${appointment.id}`)
        }
      }

    } catch(error){
      console.log(error)
    }

  }

  let buttonLabel;
  switch (type){
    case 'cancel':
      buttonLabel = 'Cancel Appointment'
      break;
    case 'create':
      buttonLabel = 'Create Appointment'
      break;
    case 'schedule':
      buttonLabel = 'Schedule Appointment'
      break;
  }
  
  return (
    <div className="bg-gray-900 py-1 px-4 rounded-3xl">
      <h1 className="text-3xl pb-4">Appointment Form</h1>

      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">
        <section className="text-yellow-400 mb-12 space-y-4">
          <h1 className="text-lg">Hello there!</h1>
          <p className="">Schedule an appointment now!</p>
        </section>

        { type !== 'cancel' && (
          <>
            <CustomFormFieldTemplate
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name='primaryExpert'
              label='Primary Expert'
              placeholder="Select an Expert"
            >
              {Experts.map((expert) => (
                <SelectItem key={expert.name} value={expert.name}>
                  <div className="flex cursor-pointer items-center gap-5">
                    <Image src={expert.image} alt={expert.name} 
                      width={40} height={40}
                      className='rounded-full p-0.5 border border-blue-500'
                    />
                    <p>{expert.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormFieldTemplate>

            <CustomFormFieldTemplate
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name='schedule'
              label='Expected Appointment Date'
              iconSource={iconExampleTwo}
              iconAlt='user'
              showTimeSelect='EMPTY STRING DOES NOT SHOW TIME'
              dateFormat="MM/dd/yyy - h:mm aa"
            />

            <div className="flex flex-col gap-10 xl:flex-row">
              <CustomFormFieldTemplate
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name='reason'
                label='Reason for appointment'
                placeholder='Please enter a splendid reason for appointment!'
              />
              <CustomFormFieldTemplate
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name='note'
                label='Notes'
                placeholder='Enter a note!'
              />
            </div>
          </>
        )}

        {type === 'cancel' && (
          <CustomFormFieldTemplate
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name='cancellationReason'
            label='Provide reason for cancellation :('
            placeholder='Enter a reason for cancellation!'
          />
        )}

        <SubmitButton isLoading={isLoading} className={`${type === 'cancel' ? 'bg-red-500' : 'bg-green-500'}`}>{buttonLabel}</SubmitButton>

      </form>
    </Form>
    </div>
  )
}

export default AppointmentForm