"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import QuestionAnswer from "@/components/forum/QuestionAnswer";
import RelatedQuestion from "@/components/forum/RelatedQuestion";
import { Button } from "@/components/ui/Button";
import Dividers from "@/components/ui/Dividers";
import TinyMCEEditor from "@/components/ui/TinyMCEEditor";
import { ArrowLeft, Share2Icon } from "lucide-react";
import ForumService from "@/services/forum.service";
import { defaultSWRConfig } from "@/config/swr-config";
import useSWR from "swr";
import { IPost } from "@/types/post.interface";

const questionDetailsFetcher = async (id: string) => {
  const response = await ForumService.getPostById(id);
  return response.data;
};

const QuestionDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data, error, isLoading } = useSWR(
    id ? `/forum/question/${id}` : null, // chỉ fetch khi có id
    () => questionDetailsFetcher(id as string),
    {
      ...defaultSWRConfig,
      revalidateOnFocus: false,
      dedupingInterval: 0,
    }
  );
  const questionData = data?.data;
  console.log("Question Data:", questionData);

  const relatedQuestions = [
    "How to install Python packages without using pip?",
    "What is the difference between pip and pip3?",
    "How to install specific version of a package with pip?",
    "How to create a requirements.txt file for a Python project?",
    "What does the --no-deps flag do in pip install?",
  ];

  // Mock answer data - In a real app, you'd fetch these based on the question id
  const answerData = [
    {
      id: "1",
      type: "answer" as const,
      content:
        "You can use xargs to read each line from requirements.txt and pass it to pip with the desired flags:\n\n```bash\ncat requirements.txt | xargs -n 1 pip install --no-build-isolation\n```\n\nThis will run pip install for each package individually with the --no-build-isolation flag.",
      user: {
        name: "TechHelper",
        profilePic:
          "https://images.pexels.com/photos/669502/pexels-photo-669502.jpeg?cs=srgb&dl=pexels-goumbik-669502.jpg&fm=jpg",
        role: "Python Expert",
        joinDate: "Jan 2019",
        reputation: 15420,
      },
      votes: 42,
      date: "5 years ago",
      isAccepted: true,
      isUpvoted: false,
      isDownvoted: false,
      questionId: id as string,
    },
    {
      id: "2",
      type: "answer" as const,
      content:
        "You can use xargs to read each line from requirements.txt and pass it to pip with the desired flags:\n\n```bash\ncat requirements.txt | xargs -n 1 pip install --no-build-isolation\n```\n\nThis will run pip install for each package individually with the --no-build-isolation flag.",
      user: {
        name: "TechHelper",
        profilePic:
          "https://images.pexels.com/photos/669502/pexels-photo-669502.jpeg?cs=srgb&dl=pexels-goumbik-669502.jpg&fm=jpg",
        role: "Python Expert",
        joinDate: "Jan 2019",
        reputation: 15420,
      },
      votes: 42,
      date: "5 years ago",
      isAccepted: true,
      isUpvoted: false,
      isDownvoted: false,
      questionId: id as string,
    },
  ];

  const handleBack = () => {
    router.push("/forum");
  };

  const [content, setContent] = useState("");

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
  };
  const handlePostAnswer = () => {
    console.log("Post Answer:", content);
    // Here you would typically send the content to your backend
  };

  return (
    <div className="flex flex-col justify-center gap-6 px-4 md:flex-row">
      <div className="w-full md:w-[60%]">
        {/* Navigation and Actions Bar */}
        <div className="flex justify-between items-center mb-6">
          <Button
            className="flex items-center gap-2 text-white "
            onClick={handleBack}
          >
            <ArrowLeft size={18} />
            Back to Forum
          </Button>
        </div>

        {/* Main Question Component */}
        <div className="bg-white shadow-sm border border-gray-200 mb-6">
          {isLoading && <div>Loading...</div>}
          {error && <div>Something went wrong!</div>}
          {questionData && <QuestionAnswer question={questionData} />}
        </div>

        <div className="flex justify-between items-center p-4mb-6">
          {/* number of answer */}
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-700">
                {questionData?.comments?.length} Answers
              </h3>
            </div>
          </div>
          {/* reply button */}
          <div className="">
            <Button
              className="bg-[#2F1667] hover:bg-[#816ab4] hover:cursor-pointer text-white px-4 py-2 rounded-md"
              onClick={() => console.log("reply")}
            >
              <Share2Icon size={16} className="mr-2" />
              Reply
            </Button>
          </div>
        </div>

        {/* Example of how to use the Answer component separately */}
        {/* In a real app, you would map through actual answers */}
        {/* <div className="bg-white shadow-sm border border-gray-200 ">
          {answerData.map((answer) => (
            <div key={answer.id}>
              <QuestionAnswer {...answer} />
              <Dividers />
            </div>
          ))}
        </div> */}
        {/* Add Answer section */}
        <div className="mt-12">
          <h3 className="text-xl text-gray-700 mb-4">Your Answer</h3>
          <TinyMCEEditor
            onChange={handleEditorChange}
            initialValue="<p>Initial content.</p>"
          />
          <div className="mt-4">
            <Button
              onClick={handlePostAnswer}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Post Your Answer
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full md:w-[30%]">
        {/* Related questions */}
        {relatedQuestions && relatedQuestions.length > 0 && (
          <div className="mt-12">
            <RelatedQuestion questions={relatedQuestions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionDetailPage;
