'use client'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Checkbox } from "./ui/checkbox"
import { Select, SelectValue, SelectContent, SelectTrigger } from "./ui/select"
import { Textarea } from "./ui/textarea"

import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"
import { FormFieldType } from "./forms/MemberForm"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


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
  const { fieldType, iconSource, iconAlt, placeholder, showTimeSelect, dateFormat, renderSkeleton } = props

  const calendarIcon = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNhbGVuZGFyLWRheXMiPjxwYXRoIGQ9Ik04IDJ2NCIvPjxwYXRoIGQ9Ik0xNiAydjQiLz48cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjQiIHJ4PSIyIi8+PHBhdGggZD0iTTMgMTBoMTgiLz48cGF0aCBkPSJNOCAxNGguMDEiLz48cGF0aCBkPSJNMTIgMTRoLjAxIi8+PHBhdGggZD0iTTE2IDE0aC4wMSIvPjxwYXRoIGQ9Ik04IDE4aC4wMSIvPjxwYXRoIGQ9Ik0xMiAxOGguMDEiLz48cGF0aCBkPSJNMTYgMThoLjAxIi8+PC9zdmc+`

  switch (fieldType){
    case FormFieldType.INPUT:
      return(
        <div className="flex rounded-2xl border border-yellow-500 bg-gray-900">
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

    case FormFieldType.TEXTAREA:
      return(
        <FormControl>
          <Textarea 
            placeholder={placeholder}
            {...field}
            className='shad-textarea text-green-400 font-bold'
            disabled={props.disabled}
          />
        </FormControl>
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

    case FormFieldType.DATE_PICKER:
      return(
        <div className="bg-red-800 flex rounded-md border border-yellow-600">
          <Image src={calendarIcon} alt='calendar' width={25} height={25} />
          <FormControl>
            <DatePicker 
              selected={field.value} 
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? 'MMMM/dd/yyyy'}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel='Time:'
              wrapperClassName='date-picker'
            />
          </FormControl>
        </div>
      )

    case FormFieldType.SKELETON:
      return(
        renderSkeleton ? renderSkeleton(field) : null
      )

    case FormFieldType.SELECT:
      return(
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className='shad-select-content'>
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      )

    case FormFieldType.CHECKBOX:
      return(
        <FormControl>
          <div className="flex items-center gap-5">
            <Checkbox 
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className="checkbox_label">
              {props.label}
            </label>
          </div>
        </FormControl>
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