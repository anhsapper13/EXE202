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
import QuestionFilters, { FilterType } from "@/components/forum/FilterQuestion";
import HotDiscussions from "@/components/forum/HotDiscussions";
import TopMembers from "@/components/forum/TopMembers";
import StartDiscussion from "@/components/forum/create-discussion/StartDiscussion";
// import ChatWidget from "@/components/forum/ChatWidget";
import { listQuestions } from "./listQuestions";
import ForumService from "@/services/forum.service";
import useSWR from "swr";
import { defaultSWRConfig } from "@/config/swr-config";
import PaginationCustom from "@/components/common/PaginationCustom";
import { IPost } from "@/types/post.interface";

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

const PAGE_SIZE_DEFAULT = 6;
const forumFetcher = async ([url, page, limit, searchParams]: [
  string,
  number,
  number,
  any,
]) => {
  const params = {
    page,
    limit,
    ...searchParams,
  };
  console.log(url, page, limit, searchParams);

  const res = await ForumService.getAllPosts(params);
  return res.data;
};
const MainForum = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("newest");

  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_DEFAULT);
  const [searchParams] = useState<any>({});

  const { data, error, isLoading } = useSWR(
    ["services", page, pageSize, searchParams],
    forumFetcher,
    {
      ...defaultSWRConfig,
      revalidateOnFocus: false,
      dedupingInterval: 0,
    }
  );
  const handlePageChange = (newPage: number, newPageSize: number) => {
    setPage(newPage);
    setPageSize(newPageSize);
  };
  const questionList: IPost[] = data?.data?.data || [];
  console.log("questionList", questionList);
  
  const total = data?.data?.total || 0;

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
              questionCount={questionList.length}
            />
            <ListCardQuestions questions={questionList} />

            {/* Pagination */}
            <PaginationCustom
              totalItems={total}
              pageSize={pageSize}
              currentPage={page}
              onPageChange={handlePageChange}
            />
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
