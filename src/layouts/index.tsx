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
      <main className="bg-stone-50 text-stone-800">
        <div className="pb-24">{props.children}</div>
        <footer className=" py-24"></footer>
      </main>
    </>
  );
};
