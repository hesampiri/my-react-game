import { Icon } from "./icon";

const Box = ({
  icon,
  onboxClick,
}: {
  icon: string;
  onboxClick: () => void;
}) => {
  return (
    <button
      className="border-4 rounded-lg cursor-pointer bg-[#C9F9FC] p-4"
      onClick={onboxClick}
    >
      <Icon value={icon} />
    </button>
  );
};

export default Box;
