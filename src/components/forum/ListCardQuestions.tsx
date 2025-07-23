import React from "react";
import CardQuestion, { CardQuestionProps } from "./CardQuestion";
import { IPost } from "@/types/post.interface";

interface ListCardQuestionsProps {
  questions: IPost[];
}

const ListCardQuestions: React.FC<ListCardQuestionsProps> = ({ questions }) => {
  return (
    <div>
      <div>
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <CardQuestion data={question} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCardQuestions;
