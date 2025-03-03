'use client'

import React, {useCallback} from 'react'
import Image from 'next/image'
import {useDropzone} from 'react-dropzone'
import { convertFileToUrl } from '@/lib/utils'

type FileUploaderProps = {
  files: File[] | undefined,
  onChange: (files: File[]) => void
}

const FileUploader = ({ files, onChange } : FileUploaderProps) => {
  const fileUploadIcon = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNsb3VkLXVwbG9hZCI+PHBhdGggZD0iTTEyIDEzdjgiLz48cGF0aCBkPSJNNCAxNC44OTlBNyA3IDAgMSAxIDE1LjcxIDhoMS43OWE0LjUgNC41IDAgMCAxIDIuNSA4LjI0MiIvPjxwYXRoIGQ9Im04IDE3IDQtNCA0IDQiLz48L3N2Zz4=`

  const onDrop = useCallback((acceptedFiles : File[]) => {
    onChange(acceptedFiles)
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div 
      {...getRootProps()}
      className='file_upload'
    >
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image 
          src={convertFileToUrl(files[0])} 
          width={1000} height={1000} alt='uploaded image' 
          className='max-h-[400px] overflow-hidden object-cover'
        />
      ): (
        <>
          <Image src={fileUploadIcon} className='bg-green-700 rounded-2xl animate-pulse' alt='upload' width={50} height={50} />
          <div className="file_upload_label">
            <p className='text-[14px]'>
              <span className="underline text-red-800 font-bold">Click to upload</span> or drag and drop
            </p>
            <p>SVG, PNG, JPG or Gif (max 800x400)</p>
          </div>
        </>
      )}
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default FileUploader;