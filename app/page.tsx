import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PatientForm from "@/components/forms/PatientForm";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">

      {/* Takes up half the screen */}
      <section className="bg-orange-700 remove-scrollbar container my-auto">
        <div className="sub-container max-w-[500px]">
          {/* <Image 
            src='./public/sample-logo.svg'
            height={200}
            width={200}
            alt='logo-goes-right-here'
            className="mb-12 h-10 w-fit"
          /> */}
          <h1 className="text-2xl capitalize mb-12">Tergis logo</h1>

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

      {/* Placeholder for Image / takes up half the screen */}
      <div className="bg-red-500 max-w-[50%] flex">
        <div className="flex-col-2">
          <div className="p-24 bg-blue-600">first</div>
          <div className="p-24 bg-green-600">second</div>
          <div className="p-24 bg-yellow-600">third</div>
        </div>
        <div className="flex-col-2">
          <div className="p-24 bg-blue-600">first</div>
          <div className="p-24 bg-green-600">second</div>
          <div className="p-24 bg-yellow-600">third</div>
        </div>
        <div className="flex-col-2">
          <div className="p-24 bg-blue-600">first</div>
          <div className="p-24 bg-green-600">second</div>
          <div className="p-24 bg-yellow-600">third</div>
        </div>
      </div>

    </div>
  );
}
