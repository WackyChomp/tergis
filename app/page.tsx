import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PatientForm from "@/components/forms/PatientForm";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">

      {/* Add Verification */}

      {/* Takes up half the screen */}
      <section className="bg-gray-800 remove-scrollbar container my-auto p-4">
        <div className="sub-container max-w-[500px]">

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

          <PatientForm/>

          <div className="text-14-regular mt-20 flex justify-between">
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
        src='https://images.pexels.com/photos/1540977/pexels-photo-1540977.jpeg'
        height={1200}
        width={1200}
        alt='half-page-image'
        className="max-w-[50%] scale-x-[-1] side-img"
      />
    </div>
  );
}
