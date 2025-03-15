import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Success = () => {
  return (
    <div className='flex h-screen max-h-screen px-[5%]'>
      <div className="success_img">
        <Link href='/'>
          <Image 
            src='https://img.icons8.com/ios/300/ghost--v1.png'
            alt='success image'
            height={1000}
            width={1000}
            className='h-10 w-fit bg-blue-500'
          />
        </Link>

        <section className='flex flex-col items-center'>
          <Image 
            src='https://media.tenor.com/ZFoOuUSqPBEAAAAj/stalzone-meme.gif'
            alt='success image'
            height={300}
            width={300}
            className='h-10 w-fit bg-orange-500'
          />

          <h2 className='header mb-6 max-w-[700px] text-center'>
            Your <span className='text-green-500'>appointment request</span> has been successfully submitted!!!
          </h2>
          <p>We will be in touch shortly to confirm</p>
        </section>

        <section className='request_details'>
          <p>Requested Appointment Details:</p>
          <div className="flex items-center gap-6">
            Image
          </div>
        </section>
      </div>
    </div>
  )
}

export default Success