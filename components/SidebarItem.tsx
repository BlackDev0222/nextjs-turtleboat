import styles from './SidebarItem.module.css'
import { ReactNode } from 'react'

const SidebarItem = ({
  icon,
  label,
  active,
  clickFunc
}: {
  icon: ReactNode,
  label: string,
  active?: boolean,
  clickFunc: Function
}) => {
  return (
    <a
      className={
        `justify-center
         flex flex-col 
         text-center w-full 
         sm:h-28 sm:py-10 py-5 cursor-pointer
         hover:bg-gray-300 
         ${active ? "bg-white text-[#CE0000] border-l-2 border-[#CE0000]" : ""}`
      }
      onClick={() => clickFunc()}>
      {icon}
      <span className="self-center text-sm font-medium">{label}</span>
    </a>
  );
}

export default SidebarItem