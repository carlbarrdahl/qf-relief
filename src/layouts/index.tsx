import { ConnectButton } from "@rainbow-me/rainbowkit";
import site from "config/site";
import Head from "next/head";
import { PropsWithChildren } from "react";

export const Layout = (props: PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>{site.title}</title>
        <meta name="description" content={site.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative bg-stone-50 text-stone-800">
        <div className="absolute top-1 right-1 z-10 ">
          <ConnectButton />
        </div>
        <div className="pb-24">{props.children}</div>
        <footer className=" py-24"></footer>
      </main>
    </>
  );
};
