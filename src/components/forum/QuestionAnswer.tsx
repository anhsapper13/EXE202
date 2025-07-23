import React, { useState } from "react";

import { CircleArrowDown, CircleArrowUp } from "lucide-react";
import Dividers from "../ui/Dividers";

import { Button } from "../ui/Button";
import TinyMCEEditor from "../ui/TinyMCEEditor";
import Image from "next/image";
import { IPost } from "@/types/post.interface";
import { format } from "date-fns";

export interface QuestionAnswerProps {
  question: IPost;
}

const QuestionAnswer: React.FC<QuestionAnswerProps> = ({ question }) => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentContent, setCommentContent] = useState<string>("");
  if (!question) {
    return <div className="p-4 text-gray-500">No question data.</div>;
  }

  // Common props for both types
  const { title, body, creationDate, lastEditDate, viewCount, user } = question;

  // const renderVotingUI = () => (
  //   <div className="flex w-1/10 flex-col justify-center items-center mr-4">
  //     <Button
  //       className={`cursor-pointer hover:scale-110 transition-transform duration-200 ${
  //         isUpvoted ? "text-blue-500" : ""
  //       }`}
  //       onClick={handleUpVote}
  //     >
  //       <CircleArrowUp size={40} />
  //     </Button>
  //     <span className="text-2xl text-center font-bold">{votes}</span>
  //     <Button
  //       className={`cursor-pointer hover:scale-110 transition-transform duration-200 ${
  //         isDownvoted ? "text-red-500" : ""
  //       }`}
  //       onClick={handleDownVote}
  //     >
  //       <CircleArrowDown size={40} />
  //     </Button>
  //   </div>
  // );

  // Render user info card (common for both question and answer)
  const renderUserInfoCard = (): React.ReactNode => (
    <div className="mt-6 flex justify-end">
      <div className="bg-blue-50 p-3 rounded-lg flex items-center gap-3 max-w-xs">
        <Image
          src={
            user?.avatar ||
            "https://images.pexels.com/photos/669502/pexels-photo-669502.jpeg?cs=srgb&dl=pexels-goumbik-669502.jpg&fm=jpg"
          }
          alt={user?.lastName}
          className="w-12 h-12 rounded-md object-cover border border-gray-300"
          width={48}
          height={48}
        />
        <div>
          <p className="font-medium text-blue-700">
            {user?.firstName} {user?.lastName}
          </p>
          {user?.role && <p className="text-xs text-gray-600">{user?.role}</p>}
        </div>
      </div>
    </div>
  );

  // Question-specific content
  const renderQuestionContent = () => {
    return (
      <>
        {/* Question header */}
        <div>
          <h1 className="text-2xl text-gray-600">{title}</h1>
          <div className="flex gap-4 text-xs my-2">
            <div>
              <span className="text-gray-500">Asked </span>{" "}
              {format(new Date(creationDate), "MMM dd, yyyy")}
            </div>
            <div>
              <span className="text-gray-500">Modified </span>{" "}
              {format(new Date(lastEditDate), "MMM dd, yyyy")}
            </div>
            <div>
              <span className="text-gray-500">Views </span>
              {viewCount} times
            </div>
          </div>
        </div>

        {/* Dividers */}
        <Dividers className="my-4" />

        {/* Question body */}
        <div className="flex w-full items-start justify-start mb-4">
          {/* {renderVotingUI()} */}

          <div className="w-9/10 flex-1">
            {/* Question content */}
            <div className="prose max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: body
                    .replace(/\n/g, "<br />")
                    .replace(/```(.*?)```/g, "<pre><code>$1</code></pre>"),
                }}
              />
            </div>
            {/* Tags - Only shown for questions */}
            <div className="flex gap-2 mt-4 flex-wrap">
              {question?.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm"
                >
                  {tag.name}
                </span>
              ))}
            </div>
            {renderUserInfoCard()}
          </div>
        </div>
      </>
    );
  };

  // Answer-specific content
  // const renderAnswerContent = () => {
  //   if (type !== "answer") return null;
  //   const answerProps = props as AnswerProps;
  //   return (
  //     <>
  //       <div className="flex w-full items-start justify-start mb-4">
  //         {renderVotingUI()}

  //         <div className="w-9/10 flex-1">
  //           {/* Answer content */}
  //           <div className="prose max-w-none">
  //             <div
  //               dangerouslySetInnerHTML={{
  //                 __html: answerProps.content
  //                   .replace(/\n/g, "<br />")
  //                   .replace(/```(.*?)```/g, "<pre><code>$1</code></pre>"),
  //               }}
  //             />
  //           </div>
  //           <div className="mt-4 flex items-center gap-4">
  //             <button
  //               className="text-gray-600 hover:text-gray-800"
  //               onClick={() => setShowCommentInput(!showCommentInput)}
  //             >
  //               Comment
  //             </button>
  //             <button className="text-gray-600 hover:text-gray-800">
  //               Edit
  //             </button>
  //             <button className="text-gray-600 hover:text-gray-800">
  //               Delete
  //             </button>
  //           </div>

  //           {showCommentInput && (
  //             <div className="mt-4">
  //               <div className="flex gap-4">
  //                 <Image
  //                   src={answerProps.user?.profilePic || "/default-avatar.png"}
  //                   alt="User avatar"
  //                   className="w-10 h-10 rounded-full"
  //                   width={40}
  //                   height={40}
  //                 />
  //                 <div className="flex-1">
  //                   <TinyMCEEditor
  //                     height={150}
  //                     placeholder="Write your comment here..."
  //                     onChange={(content: string) => {
  //                       setCommentContent(content);
  //                     }}
  //                   />
  //                   <div className="mt-2 flex justify-end">
  //                     <button
  //                       className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
  //                       onClick={() => {
  //                         // TODO: Add API call to post comment
  //                         if (commentContent.trim()) {
  //                           console.log("Posting comment:", commentContent);
  //                           setCommentContent("");
  //                           setShowCommentInput(false);
  //                         }
  //                       }}
  //                     >
  //                       Post Comment
  //                     </button>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           )}

  //           {/* <ReplyAnswersList listComments={answerProps.comments || []} /> */}
  //           {renderUserInfoCard()}
  //           {/* display comment for answer */}
  //           <div className="mt-4">
  //             {/* <ReplyAnswersList listComments={listComments} /> */}
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
  // };

  return <div className="p-4">{renderQuestionContent()}</div>;
};

export default QuestionAnswer;
