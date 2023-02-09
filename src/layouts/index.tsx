import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "components/Link";
import site from "config/site";
import Head from "next/head";
import { PropsWithChildren } from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-2">
      <div className="flex items-center gap-8">
        <div className="text-xs font-bold  tracking-wider">QF relief</div>
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
      <main className="bg-stone-50 text-stone-800">
        <Header />
        <div className="pb-24">{props.children}</div>
        <footer className=" py-24"></footer>
      </main>
    </>
  );
};
