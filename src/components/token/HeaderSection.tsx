
import TokenDetailHeader from "./TokenDetailHeader";
import ThemeToggle from "../ThemeToggle";

const HeaderSection = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <TokenDetailHeader />
      <ThemeToggle />
    </div>
  );
};

export default HeaderSection;
