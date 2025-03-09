import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AppointmentForm from "@/components/forms/AppointmentForm";

export default function NewAppointment() {
  // Example Icons
  const iconExample = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWdob3N0Ij48cGF0aCBkPSJNOSAxMGguMDEiLz48cGF0aCBkPSJNMTUgMTBoLjAxIi8+PHBhdGggZD0iTTEyIDJhOCA4IDAgMCAwLTggOHYxMmwzLTMgMi41IDIuNUwxMiAxOWwyLjUgMi41TDE3IDE5bDMgM1YxMGE4IDggMCAwIDAtOC04eiIvPjwvc3ZnPg==`
  const iconOne = `https://img.icons8.com/ios/300/ghost--v1.png`
  //const icon = ``
  
  return (
    <div className="flex h-screen max-h-screen">

      {/* Add Verification */}

      {/* Takes up half the screen */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[900px] flex-1 justify-between">

          <div className="flex">
            <Image 
              src='https://img.icons8.com/ios/300/ghost--v1.png'
              height={200}
              width={200}
              alt='logo-goes-right-here'
              className="bg-white px-3 mb-12 h-10 w-fit"
            />
            <h1 className="bg-white text-black pr-3 text-3xl capitalize mb-12">Tergis</h1>
          </div>

          <h1 className="bg-orange-500 p-4 text-black text-3xl">
            NEW APPOINTMENT COMPONENT HERE
            <AppointmentForm />
          </h1>

          <div className="text-14-regular px-2 mt-20 flex justify-between">
            <div className="flex">
              <Image src={iconExample}
                height={200} width={200} alt='icon' className="bg-red-500 rounded-full mr-1 h-7 w-fit"
              />
              <Image src={iconExample}
                height={200} width={200} alt='icon' className="bg-blue-500 rounded-full mr-1 h-7 w-fit"
              />
              <Image src={iconExample}
                height={200} width={200} alt='icon' className="bg-yellow-500 rounded-full mr-1 h-7 w-fit"
              />
              <Image src={iconExample}
                height={200} width={200} alt='icon' className="bg-pink-500 rounded-full h-7 w-fit"
              />
            </div>
            <p className="justify-items-end text-blue-500 xl:text-left">
              © 20XX Tergis
            </p>
            <Link href='/?admin=true' className='text-yellow-500'>
              Admin
            </Link>
          </div>
        </div>
      </section>

      {/* Takes up half the screen */}
      <Image
        src='https://www.gettingsmart.com/wp-content/uploads/2017/02/Schedule-calendar-Feature-Image.jpg'
        height={1200}
        width={1200}
        alt='appointment'
        className="max-w-[400px] side-img bg-bottom"
      />
    </div>
  );
}