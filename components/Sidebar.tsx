/* eslint-disable @next/next/no-img-element */
import React from "react";
import SideBarMenuItems from "./SideBarMenuItems";
import {
  BellIcon,
  HashtagIcon,
  HomeIcon,
  UserIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import {
  BookmarkIcon,
  InboxIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

const Sidebar = () => {
  const user = useSession();
  return (
    <div className="sticky top-0 mx-auto flex h-screen min-h-screen flex-col items-start justify-center p-7 sm:flex">
      {/* logo */}
      <div>
        <img
          className=" h-12 cursor-pointer rounded-full hover:rounded-full hover:bg-gray-600"
          src="/Tw3tter.svg"
          alt="Company Logo"
        />
      </div>
      {/* Menu */}
      <div className="mt-1 mb-2.5 xl:items-start">
        <SideBarMenuItems Text="Home" Icon={HomeIcon} />
        <SideBarMenuItems Text="Explore" Icon={HashtagIcon} />
        <SideBarMenuItems Text="Notification" Icon={BellIcon} />
        <SideBarMenuItems Text="Messages" Icon={InboxIcon} />
        <SideBarMenuItems Text="Bookmarks" Icon={BookmarkIcon} />
        <SideBarMenuItems Text="Lists" Icon={ClipboardIcon} />
        <SideBarMenuItems Text="Profile" Icon={UserIcon} />
        <SideBarMenuItems Text="More" Icon={EllipsisHorizontalIcon} />
      </div>
      {/* Button */}
      <button className="hidden h-12 w-56 rounded-full bg-blue-400 text-lg font-bold text-white shadow-md hover:brightness-95 xl:inline">
        Tweet
      </button>
      {/* MiniProfile */}
      <div className="hoverEffect mt-auto flex">
        {user && user.data?.user.image ? (
          <>
            <img
              className="h-10 w-10 rounded-full"
              src={user.data?.user.image}
              alt="Profile Image"
            />
            <div className="hidden leading-5 xl:inline">
              <h4 className="font-bold">{user.data.user.name}</h4>
              <p className="xl:mr-2">@{user.data.user.email}</p>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Sidebar;
