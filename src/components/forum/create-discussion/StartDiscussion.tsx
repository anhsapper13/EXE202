"use client";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const StartDiscussion = () => {
  return (
    <div>
      <div className="border border-zinc-800 rounded-xl bg-gray-100">
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Hey! How's it going?</h1>
          <Link href="/forum/create">
            <Button
           
              className="bg-[#2F1667] text-white px-4 py-2 rounded-3xl hover:cursor-pointer hover:bg-[#ac92e4] transition duration-300 ease-in-out"
            >
              Start a Discussion
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StartDiscussion;
