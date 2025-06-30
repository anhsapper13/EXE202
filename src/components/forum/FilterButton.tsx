import { Button } from "../ui/Button";

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  active,
  onClick,
  children,
}) => (
  <Button
    onClick={onClick}
    className={`flex items-center px-3 py-1.5 text-sm rounded-md transition-colors ${
      active
        ? "bg-[#e3e6e8] text-[#3b4045]"
        : "text-[#6a737c] hover:bg-[#f8f9f9]"
    }`}
  >
    {children}
  </Button>
);
export default FilterButton;
