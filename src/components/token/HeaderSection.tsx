
import TokenDetailHeader from "./TokenDetailHeader";
import ThemeToggle from "../ThemeToggle";

const HeaderSection = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <TokenDetailHeader />
      <div className="flex items-center">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default HeaderSection;
