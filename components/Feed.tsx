/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import React from "react";
import { api } from "y/utils/api";

const Feed = () => {
  return (
    <div className="w-12 flex-grow border-r border-l border-gray-700 ">
      Home
      <CreatePost />
      <Posts />
    </div>
  );
};

const CreatePost = () => {
  const { data: sessionData } = useSession();
  if (!sessionData?.user) return null;

  const image = sessionData.user.image ? sessionData.user.image : "";

  return (
    <div className="flex flex-col border-t border-b border-gray-700">
      <div className="flex gap-8  p-5">
        <img
          src={image}
          alt="Profile Picture"
          className="h-14 w-14 rounded-full"
        ></img>
        <input
          placeholder="Tweet!"
          autoComplete="off"
          className="w-full  border-none  bg-transparent outline-none"
        />
      </div>
      <div className="mx-5 mb-2 border border-gray-700" />
      <button className="ml-auto mr-2 mb-2  w-24 rounded-full bg-blue-400 p-1 font-bold hover:brightness-95">
        Tweet
      </button>
    </div>
  );
};

const Posts = () => {
  const { data } = api.posts.getAll.useQuery();

  return (
    <div className="flex flex-col">
      {data?.map((post) => (
        <div key={post.post.id} className="border-b border-gray-700 ">
          <div className="m-6 flex">
            {post.author.image ? (
              <img
                className="h-14 w-14 rounded-full"
                alt="Profile Pic"
                src={post.author.image}
              />
            ) : null}
            <div className="flex flex-col">
              <p className="ml-2 text-xl font-bold text-white">
                @{post.author.name}
              </p>
              <p className="ml-2 text-lg text-white ">{post.post.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
