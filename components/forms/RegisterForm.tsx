"use client"

import Image from "next/image"

import { z } from "zod"     // for validation
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Form, FormControl } from "../ui/form"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import FileUploader from "../FileUploader"

import CustomFormFieldTemplate from "../CustomFormFieldTemplate"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { MemberFormValidation } from '../../lib/validation'
import { registerMember } from "@/lib/actions/member.actions"
import { useRouter } from "next/navigation"
import { FormFieldType } from "./MemberForm"

import { GenderOptions, IdentificationTypes, MemberFormDefaultValues } from "@/constants"
import { SelectItem } from "../ui/select"

import { Experts } from "@/constants"

const RegisterForm = ({ user }: { user:User } ) => {
  const iconExampleTwo = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXN3b3JkcyI+PHBvbHlsaW5lIHBvaW50cz0iMTQuNSAxNy41IDMgNiAzIDMgNiAzIDE3LjUgMTQuNSIvPjxsaW5lIHgxPSIxMyIgeDI9IjE5IiB5MT0iMTkiIHkyPSIxMyIvPjxsaW5lIHgxPSIxNiIgeDI9IjIwIiB5MT0iMTYiIHkyPSIyMCIvPjxsaW5lIHgxPSIxOSIgeDI9IjIxIiB5MT0iMjEiIHkyPSIxOSIvPjxwb2x5bGluZSBwb2ludHM9IjE0LjUgNi41IDE4IDMgMjEgMyAyMSA2IDE3LjUgOS41Ii8+PGxpbmUgeDE9IjUiIHgyPSI5IiB5MT0iMTQiIHkyPSIxOCIvPjxsaW5lIHgxPSI3IiB4Mj0iNCIgeTE9IjE3IiB5Mj0iMjAiLz48bGluZSB4MT0iMyIgeDI9IjUiIHkxPSIxOSIgeTI9IjIxIi8+PC9zdmc+`
  const iconExampleThree = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXBob25lIj48cGF0aCBkPSJNMjIgMTYuOTJ2M2EyIDIgMCAwIDEtMi4xOCAyIDE5Ljc5IDE5Ljc5IDAgMCAxLTguNjMtMy4wNyAxOS41IDE5LjUgMCAwIDEtNi02IDE5Ljc5IDE5Ljc5IDAgMCAxLTMuMDctOC42N0EyIDIgMCAwIDEgNC4xMSAyaDNhMiAyIDAgMCAxIDIgMS43MiAxMi44NCAxMi44NCAwIDAgMCAuNyAyLjgxIDIgMiAwIDAgMS0uNDUgMi4xMUw4LjA5IDkuOTFhMTYgMTYgMCAwIDAgNiA2bDEuMjctMS4yN2EyIDIgMCAwIDEgMi4xMS0uNDUgMTIuODQgMTIuODQgMCAwIDAgMi44MS43QTIgMiAwIDAgMSAyMiAxNi45MnoiLz48L3N2Zz4=`

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof MemberFormValidation>>({
    resolver: zodResolver(MemberFormValidation),
    defaultValues: {
      ...MemberFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof MemberFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);

    
      let formData;
      if (values.identificationDocument && values.identificationDocument.length > 0){
        const blobFile = new Blob([values.identificationDocument[0]], {
          type: values.identificationDocument[0].type,
        });

        formData = new FormData();
        formData.append('blobFile', blobFile);
        formData.append('fileName', values.identificationDocument[0].name);
      }
      
    try {
      const memberData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      }
      const newMember = await registerMember(memberData);

      if(newMember) {
        router.push(`/members/${user.$id}/new-appointment`)
      }
    } catch (error) {
      console.log(error)
    }

    setIsLoading(false);
  }
  
  return (
    <div className="bg-orange-900 hover:bg-gray-900 transition py-1 px-4 rounded-3xl">
      <h1 className="text-3xl pb-4">Registration Form</h1>

      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="text-yellow-400 mb-12">
          <h1 className="header">Welcome!</h1>
          <p className="text-gray-400">We have a long way to go. Hurry now to add your information and get started soon!</p>
        </section>

        <hr className="text-orange-700 border border-dashed" />
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
        </div>

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
            placeholder="Person's Name"
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

        <hr className="text-orange-700 border border-dashed" />
        <section className="text-yellow-400 mb-9 space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub_header">Information Goes Here</h2>
          </div>
        </section>

        <div className="flex flex-col gap-6 xl:flex-row">
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
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormFieldTemplate
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name='allergies'
              label='Allergies (optional)'
              placeholder='Nuts, Pollen, Dust, Seafood'
            />
            
            <CustomFormFieldTemplate
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name='currentMedication'
              label='Current Medication (optional)'
              placeholder='Tyleno #mg'
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormFieldTemplate
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='insuranceProvider'
              label='Insurance Provider'
              placeholder='Crimson Cross'
              iconSource={iconExampleTwo}
              iconAlt='user'
            />
            
            <CustomFormFieldTemplate
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='insurancePolicyNumber'
              label='Insurance Policy Number'
              placeholder='asdfghjkl12345678'
              iconSource={iconExampleTwo}
              iconAlt='user'
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormFieldTemplate
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name='familyMedicalHistory'
              label='Family Medical History'
              placeholder='[parent] has [condition]'
            />
            
            <CustomFormFieldTemplate
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name='pastMedicalHistory'
              label='Past Medical History'
              placeholder='Fractured spleen'
            />
          </div>

        <hr className="text-orange-700 border border-dashed" />
        <section className="text-yellow-400 mb-9 space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub_header">Identification & Verification</h2>
          </div>
        </section>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormFieldTemplate
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name='identificationType'
            label='Identification Type'
            placeholder="Select an Identification Type"
          >
            {IdentificationTypes.map((identificationType) => (
              <SelectItem key={identificationType} value={identificationType}>
                <div className="flex cursor-pointer items-center gap-5">
                  <p>{identificationType}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormFieldTemplate>
        </div>


        <CustomFormFieldTemplate
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name='identificationDocument'
          label='Scanned copy of identification document:'
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
          iconSource={iconExampleThree}
          iconAlt="phone"
        />

        <hr className="text-orange-700 border border-dashed" />
        <section className="text-yellow-400 mb-9 space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub_header">Consent and Policy</h2>
          </div>

          <CustomFormFieldTemplate
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name='treatmentConsent'
            label='I hearby consent to treatment'
          />
          <CustomFormFieldTemplate
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name='disclosureConsent'
            label='I hearby consent to disclosure'
          />
          <CustomFormFieldTemplate
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name='privacyConsent'
            label='I hearby consent to privacy'
          />
        </section>

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