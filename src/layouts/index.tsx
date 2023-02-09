import Head from "next/head";
import { PropsWithChildren } from "react";

export const Layout = (props: PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>qf-relief</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="prose-xl flex min-h-screen flex-col bg-stone-50 text-stone-800">
        <div className="flex-1">{props.children}</div>
        <footer className=" bg-stone-900 p-32"></footer>
      </main>
    </>
  );
};
