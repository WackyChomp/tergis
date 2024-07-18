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
import { FormFieldType } from "./forms/PatientForm"

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
        <div className="flex rounded-md border border-yellow-500 bg-blue-500">
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
        {/* No checkbox exists and label exists = render label */}
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