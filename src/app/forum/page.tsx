"use client";
import React, { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import HeaderForum from "@/components/forum/HeaderForum";
import CardAboutForum from "@/components/forum/CardAboutForum";
import {
  faBullhorn,
  faCircleQuestion,
  faLightbulb,
  faUsersBetweenLines,
} from "@fortawesome/free-solid-svg-icons";
// import { CardQuestionProps } from "@/components/forum/CardQuestion";
import ListCardQuestions from "@/components/forum/ListCardQuestions";
import QuestionFilters, {
  FilterType,
} from "@/components/forum/FilterQuestion";
import HotDiscussions from "@/components/forum/HotDiscussions";
import TopMembers from "@/components/forum/TopMembers";
import StartDiscussion from "@/components/forum/create-discussion/StartDiscussion";
// import ChatWidget from "@/components/forum/ChatWidget";
import { listQuestions } from "./listQuestions";

const listCard = [
  {
    icon: (
      <FontAwesomeIcon
        icon={faCircleQuestion}
        style={{ width: 100, height: 100 }}
      />
    ),
    title: "Q&A",
    description: "Find answers and ask experts for advice",
    color: "#C1FFC9",
  },
  {
    icon: (
      <FontAwesomeIcon icon={faLightbulb} style={{ width: 100, height: 100 }} />
    ),
    title: "User Tips",
    description: "Discover tips from other users",
    color: "#A8C6F5",
  },
  {
    icon: (
      <FontAwesomeIcon
        icon={faUsersBetweenLines}
        style={{ width: 100, height: 100 }}
      />
    ),
    title: "Casual Conversation",
    description: "Casual Conversation",
    color: "#DAA5A5",
  },
  {
    icon: (
      <FontAwesomeIcon icon={faBullhorn} style={{ width: 100, height: 100 }} />
    ),
    title: "News & Announcements",
    description: "Get latest news and updates",
    color: "#AFF981",
  },
];

const MainForum = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("newest");
  
  const filteredQuestions = useMemo(() => {
    switch (activeFilter) {
      case "hot":
        return [...listQuestions].sort((a, b) => b.view_number - a.view_number);
      //   case "votes":
      //     return [...listQuestions].sort(
      //       (a, b) => (b.votes || 0) - (a.votes || 0)
      //     );
      case "unanswered":
        return listQuestions.filter((q) => q.answer_number === 0);
      case "newest":
      default:
        return listQuestions; // Already sorted by date
    }
  }, [activeFilter]);
  return (
    <div>
      <HeaderForum />
      <div className="container mx-auto px-4 py-8 hidden md:block">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {listCard.map((item, index) => (
            <CardAboutForum
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              color={item.color}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Main Content - Questions */}
          <div className="w-full lg:w-2/3">
            <QuestionFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              questionCount={filteredQuestions.length}
            />
            <ListCardQuestions questions={filteredQuestions} />

            {/* Pagination */}
            <div className="flex justify-center mt-6">
              <div className="flex space-x-1">
                <a
                  href="#"
                  className="px-4 py-2 bg-white rounded-md hover:bg-gray-100"
                >
                  1
                </a>
                <a
                  href="#"
                  className="px-4 py-2 bg-white rounded-md hover:bg-gray-100"
                >
                  2
                </a>
                <a
                  href="#"
                  className="px-4 py-2 bg-[#2F1667] text-white rounded-md"
                >
                  3
                </a>
                <a
                  href="#"
                  className="px-4 py-2 bg-white rounded-md hover:bg-gray-100"
                >
                  4
                </a>
                <a
                  href="#"
                  className="px-4 py-2 bg-white rounded-md hover:bg-gray-100"
                >
                  5
                </a>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3 space-y-4">
            <StartDiscussion />
            <HotDiscussions />
            <TopMembers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainForum;
