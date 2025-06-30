"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import BackGroundCreate from "@/../public/assets/background-create-post-1.jpg";
import CreateTopic from "@/components/forum/create-discussion/CreateTopic";
import ForumTips from "@/components/forum/create-discussion/ForumTips";

export default function CreateDiscussionPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/forum"); 
  };

  return (
    <div className="min-h-screen relative">
      <div className="inset-0 z-0">
        <Image
          src={BackGroundCreate}
          alt="Pet Forum Background"
          fill
          priority
          
        />
        {/* Dark overlay for better content visibility */}
        <div className="absolute inset-0"></div>
      </div>

      {/* Content positioned on top of the background */}
      <div className="relative z-10 pt-16 pb-10">
        {/* Page header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
            Create New Discussion
          </h1>
          <p className="text-black/80 mt-4 max-w-2xl mx-auto px-4">
            Share your thoughts, questions, and experiences with our pet-loving community
          </p>
        </div>

        {/* Main content container */}
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left column (2/3) - CreateTopic form */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-6">
                
                <CreateTopic onSuccess={handleSuccess} />
              </div>
            </div>

            {/* Right column (1/3) - Additional component */}
            <div className="w-full lg:w-1/3">
              {/* Tips component */}
              <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-lg p-6">
                <ForumTips />
              </div>
            </div>
          </div>

          {/* Bottom action buttons */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => router.back()}
              className="px-6 py-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-md text-gray-700 hover:text-gray-900 transition-colors shadow-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}