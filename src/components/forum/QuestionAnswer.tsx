import React, { useState } from "react";

import {
  CircleArrowDown,
  CircleArrowUp,
} from "lucide-react";
import Dividers from "../ui/Dividers";

import { Button } from "../ui/Button";
import TinyMCEEditor from "../ui/TinyMCEEditor";
import Image from "next/image";

// Question specific props
interface QuestionProps {
  type: "question";
  question: string;
  tags: string[];
  user: UserInfo;
  votes: number;
  date: string;
  views: number;
  answers: number;
  relatedQuestions?: string[];
  isAnswered: boolean;
  isUpvoted: boolean;
  isDownvoted: boolean;
}

// Answer specific props
interface AnswerProps {
  type: "answer";
  content: string;
  user: UserInfo;
  votes: number;
  date: string;
  isAccepted: boolean;
  isUpvoted: boolean;
  isDownvoted: boolean;
  questionId?: string;
  comments?: Comment[];
}

// Common user info interface
interface UserInfo {
  name: string;
  profilePic: string;
  role?: string;
  joinDate?: string;
  reputation?: number;
}

// Union type for the component
type QuestionAnswerProps = QuestionProps | AnswerProps;

// const listComments = [
//   {
//     comment_id: "1",
//     content: "This is a comment",
//     userId: {
//       id: 1,
//       username: "user1",
//       email: " ",
//       name: "User1",
//       profileImage: "https://images.pexels.com/photos/669502/pexels-photo-669502.jpeg?cs=srgb&dl=pexels-goumbik-669502.jpg&fm=jpg",
//       role: "USER",
//     },
//     creationDate: new Date("2023-10-01T12:00:00Z"),
//     score: 10,
//     postId: "1",
//   },
//   {
//     id: "1",
//     content: "This is a comment",
//     userId: {
//       id: 1,
//       username: "user1",
//       email: " ",
//       name: "User1",
//       profileImage: "https://images.pexels.com/photos/669502/pexels-photo-669502.jpeg?cs=srgb&dl=pexels-goumbik-669502.jpg&fm=jpg",
//       role: "USER",
//     },
//     creationDate: new Date("2023-10-01T12:00:00Z"),
//     score: 10,
//     postId: "1",
//   },
// ];

const QuestionAnswer: React.FC<QuestionAnswerProps> = (props) => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentContent, setCommentContent] = useState<string>("");

  // Common props for both types
  const {
    type,
    votes = 0,
    user,
    isUpvoted = false,
    isDownvoted = false,
  } = props;

  // Handle voting
  const handleUpVote = () => {
    console.log(`Upvoted ${type}`);
  };

  const handleDownVote = () => {
    console.log(`Downvoted ${type}`);
  };

  // Sample answers data (would come from props in a real app)
  // const sampleAnswers = [
  //   {
  //     id: "1",
  //     content:
  //       "You can use xargs to read each line from requirements.txt and pass it to pip with the desired flags:\n\n```bash\ncat requirements.txt | xargs -n 1 pip install --no-build-isolation\n```\n\nThis will run pip install for each package individually with the --no-build-isolation flag.",
  //     user: {
  //       name: "TechHelper",
  //       profilePic: "https://images.pexels.com/photos/669502/pexels-photo-669502.jpeg?cs=srgb&dl=pexels-goumbik-669502.jpg&fm=jpg",
  //       role: "Python Expert",
  //       joinDate: "Jan 2019",
  //       reputation: 15420,
  //     },
  //     votes: 42,
  //     date: "5 years ago",
  //     isAccepted: true,
  //     isUpvoted: false,
  //     isDownvoted: false,
  //   },
  //   {
  //     id: "2",
  //     content:
  //       "Another approach is to use a Python script to parse requirements.txt and install each package with the desired options:\n\n```python\nimport subprocess\nimport sys\n\nwith open('requirements.txt') as f:\n    for line in f:\n        package = line.strip()\n        if package and not package.startswith('#'):\n            subprocess.check_call([sys.executable, '-m', 'pip', 'install', \n                                 package, '--no-build-isolation'])\n```\n\nThis gives you more control over the installation process.",
  //     user: {
  //       name: "DevPython",
  //       profilePic: "https://images.pexels.com/photos/669502/pexels-photo-669502.jpeg?cs=srgb&dl=pexels-goumbik-669502.jpg&fm=jpg",
  //       joinDate: "Mar 2020",
  //       reputation: 7856,
  //     },
  //     votes: 21,
  //     date: "4 years ago",
  //     isAccepted: false,
  //     isUpvoted: false,
  //     isDownvoted: false,
  //   },
  // ];

  // Render voting UI (common for both question and answer)
  const renderVotingUI = () => (
    <div className="flex w-1/10 flex-col justify-center items-center mr-4">
      <Button
        className={`cursor-pointer hover:scale-110 transition-transform duration-200 ${
          isUpvoted ? "text-blue-500" : ""
        }`}
        onClick={handleUpVote}
      >

      <CircleArrowUp size={40} />
      </Button>
      <span className="text-2xl text-center font-bold">{votes}</span>
      <Button
        className={`cursor-pointer hover:scale-110 transition-transform duration-200 ${
          isDownvoted ? "text-red-500" : ""
        }`}
        
        onClick={handleDownVote}
      >
        <CircleArrowDown size={40} />
      </Button>
    </div>
  );

  // Render user info card (common for both question and answer)
  const renderUserInfoCard = (): React.ReactNode => (
    <div className="mt-6 flex justify-end">
      <div className="bg-blue-50 p-3 rounded-lg flex items-center gap-3 max-w-xs">
        <Image
          src={user?.profilePic || "https://images.pexels.com/photos/669502/pexels-photo-669502.jpeg?cs=srgb&dl=pexels-goumbik-669502.jpg&fm=jpg"}
          alt={user?.name}
          className="w-12 h-12 rounded-md object-cover border border-gray-300"
          width={48}
          height={48}
        />
        <div>
          <p className="font-medium text-blue-700">{user?.name}</p>
          {user?.role && <p className="text-xs text-gray-600">{user?.role}</p>}
        </div>
      </div>
    </div>
  );

  // Question-specific content
  const renderQuestionContent = () => {
    if (type !== "question") return null;

    const questionProps = props as QuestionProps;

    return (
      <>
        {/* Question header */}
        <div>
          <h1 className="text-2xl text-gray-600">{questionProps.question}</h1>
          <div className="flex gap-4 text-xs my-2">
            <div>
              <span className="text-gray-500">Asked </span> {questionProps.date}
            </div>
            <div>
              <span className="text-gray-500">Modified </span>today
            </div>
            <div>
              <span className="text-gray-500">Views </span>
              {questionProps.views} times
            </div>
          </div>
        </div>

        {/* Dividers */}
        <Dividers className="my-4" />

        {/* Question body */}
        <div className="flex w-full items-start justify-start mb-4">
          {renderVotingUI()}

          <div className="w-9/10 flex-1">
            {/* Question content */}
            <div>
              <p className="text-gray-600 text-lg">
                I am trying to install a package using pip and I want to use the
                --no-build-isolation flag. However, I have a requirements.txt
                file that contains the package name and version. How can I do
                this?
              </p>
              <p className="text-gray-600 text-lg mt-2">
                I have tried using the following command:
              </p>
              <code className="bg-gray-100 p-2 my-2 block rounded-md text-gray-700">
                pip install -r requirements.txt --no-build-isolation
              </code>
              <p className="text-gray-600 text-lg mt-2">
                But it seems that pip is not recognizing the
                --no-build-isolation flag when using the -r option. Is there a
                way to make this work?
              </p>
            </div>

            {/* Tags - Only shown for questions */}
            <div className="flex gap-2 mt-4 flex-wrap">
              {questionProps.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm"
                >
                  {tag}
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
  const renderAnswerContent = () => {
    if (type !== "answer") return null;
    const answerProps = props as AnswerProps;
    return (
      <>
        <div className="flex w-full items-start justify-start mb-4">
          {renderVotingUI()}

          <div className="w-9/10 flex-1">
            {/* Answer content */}
            <div className="prose max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: answerProps.content
                    .replace(/\n/g, "<br />")
                    .replace(/```(.*?)```/g, "<pre><code>$1</code></pre>"),
                }}
              />
            </div>
            <div className="mt-4 flex items-center gap-4">
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={() => setShowCommentInput(!showCommentInput)}
              >
                Comment
              </button>
              <button className="text-gray-600 hover:text-gray-800">Edit</button>
              <button className="text-gray-600 hover:text-gray-800">Delete</button>
            </div>
            
            {showCommentInput && (
              <div className="mt-4">
                <div className="flex gap-4">
                  <Image
                    src={answerProps.user?.profilePic || '/default-avatar.png'}
                    alt="User avatar"
                    className="w-10 h-10 rounded-full"
                    width={40}
                    height={40}
                  />
                  <div className="flex-1">
                    <TinyMCEEditor
                      height={150}
                      placeholder="Write your comment here..."
                      onChange={(content: string) => {
                        setCommentContent(content);
                      }}
                    />
                    <div className="mt-2 flex justify-end">
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
                        onClick={() => {
                          // TODO: Add API call to post comment
                          if (commentContent.trim()) {
                            console.log('Posting comment:', commentContent);
                            setCommentContent("");
                            setShowCommentInput(false);
                          }
                        }}
                      >
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* <ReplyAnswersList listComments={answerProps.comments || []} /> */}
            {renderUserInfoCard()}
            {/* display comment for answer */}
            <div className="mt-4">
              {/* <ReplyAnswersList listComments={listComments} /> */}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="p-4">
      {type === "question" ? renderQuestionContent() : renderAnswerContent()}
    </div>
  );
};

export default QuestionAnswer;
