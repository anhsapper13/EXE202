import React from "react";
import Link from "next/link";

interface RelatedQuestionProps {
  questions: string[] | RelatedQuestionItem[];
  title?: string;
  maxItems?: number;
  className?: string;
}

interface RelatedQuestionItem {
  id: string;
  title: string;
  votes?: number;
  answers?: number;
  views?: number;
}

const RelatedQuestion: React.FC<RelatedQuestionProps> = ({
  questions,
  title = "Related Questions",
  maxItems = 5,
  className = "",
}) => {
  const isSimpleArray = typeof questions[0] === "string";
  const displayQuestions = questions.slice(0, maxItems);

  return (
    <div className={`bg-gray-50 p-4 rounded-lg ${className}`}>
      <h3 className="text-lg text-gray-700 mb-2 font-medium">{title}</h3>
      <ul className="space-y-2">
        {displayQuestions.map((question, i) => (
          <li key={i} className="hover:bg-gray-100 p-2 rounded transition-colors">
            {isSimpleArray ? (
              <Link 
                href={`/forum/question/${i+1}`}
                className="text-blue-600 hover:text-blue-800 text-sm block"
              >
                {question as string}
              </Link>
            ) : (
              <Link
                href={`/forum/question/${(question as RelatedQuestionItem).id}`}
                className="text-blue-600 hover:text-blue-800 text-sm block"
              >
                <div className="flex justify-between">
                  <span>{(question as RelatedQuestionItem).title}</span>
                  {(question as RelatedQuestionItem).votes !== undefined && (
                    <span className="text-gray-500 text-xs whitespace-nowrap">
                      {(question as RelatedQuestionItem).votes} votes
                    </span>
                  )}
                </div>
                {(question as RelatedQuestionItem).answers !== undefined && (
                  <div className="text-xs text-gray-500 mt-1">
                    {(question as RelatedQuestionItem).answers} answers • 
                    {(question as RelatedQuestionItem).views !== undefined && 
                      ` ${(question as RelatedQuestionItem).views} views`}
                  </div>
                )}
              </Link>
            )}
          </li>
        ))}
      </ul>
      
      {questions.length > maxItems && (
        <div className="mt-3 text-right">
          <Link href="/forum" className="text-blue-600 text-xs hover:underline">
            Show more related questions
          </Link>
        </div>
      )}
    </div>
  );
};

export default RelatedQuestion;