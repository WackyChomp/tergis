'use client'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
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
  return(
    <Input 
      type='text'
      placeholder="example placeholder"
    />
  )
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