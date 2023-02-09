import { ConnectButton } from "@rainbow-me/rainbowkit";
import site from "config/site";
import Head from "next/head";
import { PropsWithChildren } from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-2">
      <div className="text-xs font-bold uppercase tracking-wider">
        QF Relief
      </div>
      <ConnectButton />
    </header>
  );
};
export const Layout = (props: PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>{site.title}</title>
        <meta name="description" content={site.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col bg-stone-50 text-stone-800">
        <Header />
        <div className="flex-1">{props.children}</div>
        <footer className=" bg-stone-900 p-32"></footer>
      </main>
    </>
  );
};
