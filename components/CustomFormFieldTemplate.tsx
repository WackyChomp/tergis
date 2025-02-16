'use client'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"
import { FormFieldType } from "./forms/MemberForm"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

{/* 
This form component will act as a base for other forms throughout the app.
Find more in the "forms" directory of "components".
*/}

interface CustomFormProps {
  control: Control<any>,
  fieldType: FormFieldType,
  name: string,
  label?: string,
  placeholder?: string,
  iconSource?: string,
  iconAlt?: string,
  disabled?: boolean,
  dateFormat?: string,
  showTimeSelect?: string,
  children?: React.ReactNode,
  renderSkeleton?: (field: any) => React.ReactNode, 
}

const RenderField = ({ field, props } : { field:any; props:CustomFormProps }) => {
  // destructure outside of parameter so it can pass entire prop object all at once
  const { fieldType, iconSource, iconAlt, placeholder } = props

  switch (fieldType){
    case FormFieldType.INPUT:
      return(
        <div className="flex rounded-2xl border border-yellow-500 bg-gray-800">
          {iconSource && (
            <Image src={iconSource} 
              alt = {iconAlt || 'icon-alt'}
              height = {25}
              width = {25}
              className="ml-2"
            />
          )}

          <FormControl>
            <Input 
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      )

    case FormFieldType.PHONE_INPUT:
      return(
        <div className="flex rounded-2xl border w-fit border-yellow-500 bg-green-900">
          <FormControl>
            <PhoneInput 
              international
              defaultCountry="US"
              placeholder = {placeholder || 'Enter a phone number'}
              withCountryCallingCode
              value={field.value as E164Number | undefined}
              onChange={field.onChange}
              className="p-1.5"
            />
          </FormControl>
        </div>
      )


    default:
    break;
  }
}

const CustomFormFieldTemplate = (props: CustomFormProps) => {
  // destructure outside of parameter so it can pass entire prop object all at once
  const { control, fieldType, name, label } = props   

  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex-1">
        {/* No checkbox exists and label exists = renders label */}
        {fieldType !== FormFieldType.CHECKBOX && label &&  (
          <FormLabel>{label}</FormLabel>
        )}

        <RenderField field={field} props={props} />

        <FormMessage className="shad-error" />
      </FormItem>
    )}
  />
  )
}

export default CustomFormFieldTemplate