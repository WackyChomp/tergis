'use client'

import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const PasskeyModal = () => {
  const closeIcon = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXgiPjxwYXRoIGQ9Ik0xOCA2IDYgMTgiLz48cGF0aCBkPSJtNiA2IDEyIDEyIi8+PC9zdmc+`

  const router = useRouter();

  const [open, setOpen] = useState(true)
  const closeModal = () => {
    setOpen(false)
    router.push('/')
  }

  return (
    <div>PasskeyModal Pop Up!!!
      <br/><br/>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger className='bg-red-900 border border-blue-400 ml-4 rounded-xl'>
          Open when <span className='text-green-500 underline'>Admin</span> is clicked :)
        </AlertDialogTrigger>
        <AlertDialogContent className='shad-alert-dialog'>
          <AlertDialogHeader>
            <AlertDialogTitle className='flex items-start justify-between'>
              Admin Access Verification
              <Image 
                src={closeIcon}
                alt='close'
                width={20}
                height={20}
                onClick={() => closeModal()}
                className='cursor-pointer'
              />
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => closeModal()}>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    
  )
}

export default PasskeyModal