import styles from './SidebarItem.module.css'

import Image from 'next/image'
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
         h-28 py-10 cursor-pointer
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