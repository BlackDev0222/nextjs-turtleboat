import { useState } from "react";

const CheckTag = ({
  text,
  onClick,
}: {
  text: string,
  onClick: Function
}) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      onClick={() => { onClick(); setIsSelected(!isSelected); }}
      className={`px-[20px] py-[5px] rounded-xl cursor-pointer ${isSelected ? "bg-[darkcyan]" : "bg-[beige]"}`}>
      <span>{text}</span>
    </div>
  );
};

export default CheckTag;