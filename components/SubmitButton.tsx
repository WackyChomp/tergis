import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

type ButtonProps = {
  isLoading: boolean,
  className?: string,
  children: React.ReactNode,
}

const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  const iconLoading = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS1kb3QtZGFzaGVkIj48cGF0aCBkPSJNMTAuMSAyLjE4YTkuOTMgOS45MyAwIDAgMSAzLjggMCIvPjxwYXRoIGQ9Ik0xNy42IDMuNzFhOS45NSA5Ljk1IDAgMCAxIDIuNjkgMi43Ii8+PHBhdGggZD0iTTIxLjgyIDEwLjFhOS45MyA5LjkzIDAgMCAxIDAgMy44Ii8+PHBhdGggZD0iTTIwLjI5IDE3LjZhOS45NSA5Ljk1IDAgMCAxLTIuNyAyLjY5Ii8+PHBhdGggZD0iTTEzLjkgMjEuODJhOS45NCA5Ljk0IDAgMCAxLTMuOCAwIi8+PHBhdGggZD0iTTYuNCAyMC4yOWE5Ljk1IDkuOTUgMCAwIDEtMi42OS0yLjciLz48cGF0aCBkPSJNMi4xOCAxMy45YTkuOTMgOS45MyAwIDAgMSAwLTMuOCIvPjxwYXRoIGQ9Ik0zLjcxIDYuNGE5Ljk1IDkuOTUgMCAwIDEgMi43LTIuNjkiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxIi8+PC9zdmc+`

  return (
    <Button type='submit' disabled={isLoading} className={className ?? 'primary-btn w-full rounded-2xl'}>
      {isLoading ? (
        <div className='flex items-center gap-4'>
          <Image
            src={iconLoading}
            alt='loader'
            width={25}
            height={25}
            className='animate-spin'
          />
          Loading happening :P ...
        </div>
      ): children}
    </Button>
  )
}

export default SubmitButton