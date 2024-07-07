import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="bg-red-500 p-4 border rounded-2xl flex-col">
          <h1 className="text-3xl underline flex justify-center">Home</h1>
          <div className="flex justify-center p-1">is where you are loved!</div>
          <div className="flex justify-center">Don't forget to dab on the great fellow samaritans!</div>
      </div>
    </main>
  );
}
