import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import MarkunreadOutlinedIcon from "@mui/icons-material/MarkunreadOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import SidebarItem from "./SidebarItem";
import InviteModal from "./InviteModal";
import useUserStore from "@/stores/useUserStore";

const LeftSidebar = ({ noSelNav }: { noSelNav?: boolean }) => {
  const router = useRouter();
  const { user } = useUserStore();
  const [visible, setVisible] = useState(false);
  const [activeMenu, setActiveMenu] = useState(0);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showUserDropMenu, setShowUserDropMenu] = useState(false);

  const urlBtnClicked = (idx: number) => {
    setActiveMenu(idx);
    router.push(menuUrls[idx]);
  };
  const inviteBtnClicked = () => {
    setShowInviteModal(true);
  };
  const onUserIconClicked = () => {
    setShowUserDropMenu(!showUserDropMenu);
  };
  const closeInviteModal = () => {
    setShowInviteModal(false);
  };
  const onSignOutBtnClicked = async () => {
    signOut();
  };

  const menu = [
    "CORE",
    "MY VENTURES",
    "TOOL BOX",
    "MESSAGES",
    user.role == "admin" ? "INVITE" : "REFERRAL",
  ];
  const menuUrls = ["/dashboard/core", "/dashboard/myventures", "/dashboard/toolbox", "/dashboard/messages"];
  const menuIcons = [
    <GroupsOutlinedIcon key={0} className="m-auto" fontSize="medium" />,
    <EmojiObjectsOutlinedIcon key={1} className="m-auto" fontSize="medium" />,
    <WorkOutlineOutlinedIcon key={2} className="m-auto" fontSize="medium" />,
    <MarkunreadOutlinedIcon key={3} className="m-auto" fontSize="medium" />,
    <PersonAddOutlinedIcon key={4} className="m-auto" fontSize="medium" />,
  ];
  const menuClickFuncs = [
    () => urlBtnClicked(0),
    () => urlBtnClicked(1),
    () => urlBtnClicked(2),
    () => urlBtnClicked(3),
    inviteBtnClicked,
  ];

  return (
    <div className="">
      <InviteModal showModal={showInviteModal} closeFunc={closeInviteModal} />
      <div
        style={visible ? { display: "flex" } : {}}
        className={`sm:flex hidden flex-col overflow-visible
                    items-center justify-between fixed  z-10
                    sm:w-28 w-20 h-screen text-gray-700 bg-gray-100 rounded`}
      >
        <a className="flex w-full px-3 sm:mt-6 mt-3 mb-3 justify-center">
          <Image alt="logo" src="/logo.png" width={56} height={56} />
        </a>
        <div className="w-full">
          <div className="flex flex-col items-center w-full">
            {menu.map((item, idx) => {
              return (
                <SidebarItem
                  key={idx}
                  label={item}
                  icon={menuIcons[idx]}
                  active={noSelNav ? false : idx == activeMenu ? true : false}
                  clickFunc={menuClickFuncs[idx]}
                />
              );
            })}
          </div>
        </div>
        <div className="relative">
          <a
            onClick={onUserIconClicked}
            className="flex items-center justify-center w-full h-16 mb-6"
          >
            <Image
              alt="user"
              src={user.image ?? "/user.png"}
              width={40}
              height={40}
              className="rounded-full cursor-pointer"
            />
          </a>
          {showUserDropMenu && (
            <ul
              className={`absolute left-10 bottom-16 z-[1000] 
                          float-left m-0 min-w-max list-none overflow-hidden 
                          rounded-lg border-none bg-white bg-clip-padding 
                          text-left text-base shadow-lg dark:bg-neutral-700`}
            >
              <li>
                <Link
                  href={"/dashboard/user/profile"}
                  className={`block w-full whitespace-nowrap bg-transparent 
                              px-4 py-2 text-sm font-normal text-neutral-700 
                              hover:bg-neutral-100 active:text-neutral-800 
                              active:no-underline disabled:pointer-events-none 
                              disabled:bg-transparent disabled:text-neutral-400 
                              dark:text-neutral-200 dark:hover:bg-neutral-600
                              cursor-pointer`}
                >
                  Profile
                </Link>
              </li>
              <li>
                <a
                  className={`block w-full whitespace-nowrap  cursor-pointer
                              bg-transparent px-4 py-2 text-sm font-normal 
                              text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 
                              active:no-underline disabled:pointer-events-none disabled:bg-transparent 
                              disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600`}
                >
                  Settings
                </a>
              </li>
              <hr
                className={`my-2 h-0 border border-t-0 border-solid 
                          border-neutral-700 opacity-25 dark:border-neutral-200`}
              />
              <li>
                <a
                  className={`block w-full whitespace-nowrap bg-transparent cursor-pointer
                              px-4 py-2 text-sm font-normal text-neutral-700 
                              hover:bg-neutral-100 active:text-neutral-800 
                              active:no-underline disabled:pointer-events-none 
                              disabled:bg-transparent disabled:text-neutral-400 
                              dark:text-neutral-200 dark:hover:bg-neutral-600`}
                  onClick={onSignOutBtnClicked}
                >
                  Sign Out
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div>
        <button
          className={
            `inline-flex items-center p-2 text-sm font-medium text-center sm:hidden
            text-gray-900 bg-blue-300 rounded-lg fixed top-1 ${visible ? "left-20" : "left-1"}`}
          onClick={() => setVisible(!visible)}>
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LeftSidebar;
