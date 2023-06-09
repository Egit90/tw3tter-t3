/* eslint-disable @next/next/no-img-element */
import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "y/utils/api";
import Sidebar from "components/Sidebar";
import Feed from "components/Feed";
import Info from "components/Info";

const Home: NextPage = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (!data || isLoading) return <div>Loading ...</div>;
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex h-screen min-h-screen max-w-7xl justify-center">
        {/* SideBar */}
        <AuthShowcase />
        <Sidebar />
        {/* Feed */}

        <Feed />
        <Info />
      </main>
    </>
  );
};

export default Home;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div>
      {/* <p className="text-center text-2xl text-white"> */}
      {/* {sessionData && <span>Logged in as {sessionData.user?.name}</span>} */}
      {/* {secretMessage && <span> - {secretMessage}</span>} */}
      {/* </p> */}
      <button
        className="rounded-full bg-white/10 px-4 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
