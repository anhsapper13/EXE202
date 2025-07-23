import { Clock, Flame, Funnel, MessageSquare, Star } from "lucide-react";
import FilterButton from "./FilterButton";

export type FilterType = "newest" | "hot" | "votes" | "unanswered";

interface QuestionFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  questionCount: number;
}

const QuestionFilters: React.FC<QuestionFiltersProps> = ({
  activeFilter,
  onFilterChange,
  questionCount,
}) => {
  return (
    <div className="flex flex-col space-y-4 my-6">
      <div className="flex flex-wrap gap-1 justify-between border-b border-gray-200 pb-2">
        {/* <div className="flex gap-1">
          <FilterButton
            active={activeFilter === "newest"}
            onClick={() => onFilterChange("newest")}
          >
            <Clock size={16} className="mr-1" />
            Newest
          </FilterButton>
          <FilterButton
            active={activeFilter === "hot"}
            onClick={() => onFilterChange("hot")}
          >
            <Flame size={16} className="mr-1" />
            Hot
          </FilterButton>
          <FilterButton
            active={activeFilter === "votes"}
            onClick={() => onFilterChange("votes")}
          >
            <Star size={16} className="mr-1" />
            Votes
          </FilterButton>
          <FilterButton
            active={activeFilter === "unanswered"}
            onClick={() => onFilterChange("unanswered")}
          >
            <MessageSquare size={16} className="mr-1" />
            Unanswered {questionCount > 0 ? `(${questionCount})` : ""}
          </FilterButton>
        </div> */}

        <div className="flex  justify-between mt-4">
          <button className="flex gap-1.5 px-4 py-2 bg-[#2F1667] hover:bg-[#2F1667] text-white rounded-md text-sm transition-colors">
            <Funnel /> <span className="text-xl">Filter</span>
          </button>
        </div>
      </div>
      {/* filter button */}
    </div>
  );
};

export default QuestionFilters;
