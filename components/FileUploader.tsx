'use client'

import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

type FileUploaderProps = {
  files: File[] | undefined,
  onChange: (files: File[]) => void
}

const FileUploader = ({ files, onChange } : FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles : File[]) => {
    onChange(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div 
      {...getRootProps()}
      className='bg-green-950 hover:bg-green-700 transition rounded-xl p-4 cursor-pointer'
    >
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default FileUploader;