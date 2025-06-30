import React from "react";
import CardQuestion, { CardQuestionProps } from "./CardQuestion";

interface ListCardQuestionsProps {
  questions: CardQuestionProps[];
}

const ListCardQuestions: React.FC<ListCardQuestionsProps> = ({ questions }) => {
  return (
    <div>
      <div>
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <CardQuestion
              ques_id={question.ques_id}
              sender={question.sender}
              sender_avatar={question.sender_avatar}
              date={question.date}
              title={question.title}
              question={question.question}
              tags={question.tags}
              view_number={question.view_number}
              answer_number={question.answer_number}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCardQuestions;
