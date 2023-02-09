import { type NextPage } from "next";
import NextLink from "next/link";
import { Layout } from "layouts";
import { ComponentPropsWithoutRef } from "react";
import { tv } from "tailwind-variants";
import { Link } from "components/Link";
import { Button } from "components/Button";
import { Markdown } from "components/Markdown";
import { Tab, Tabs } from "components/Tabs";
import { Avatar } from "components/Avatar";

const banner = tv({ base: "h-72 bg-stone-900" });
const container = tv({ base: "container mx-auto max-w-screen-lg" });

const RoundBanner = () => <div className={banner()} />;
const RoundLogo = () => <Avatar size="lg" />;
const Container = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"section">) => (
  <section className={container({ class: className })} {...props} />
);

const notImplemented = () => alert("not implemented");
const ViewRoundPage: NextPage = () => {
  return (
    <Layout>
      <RoundBanner />
      <Container className="-mt-24 mb-16 flex items-end gap-4">
        <RoundLogo />
        <div className="flex flex-1 justify-between">
          <div>
            <h2 className="m-0 text-4xl font-bold">Round Title</h2>
            <Link href="#" target={"_blank"}>
              https://project-website.xyz
            </Link>
          </div>
          <div>
            <Button
              onClick={notImplemented}
              as={NextLink}
              href="#"
              color="dark"
            >
              Donate to project
            </Button>
          </div>
        </div>
      </Container>

      <Container>
        <Tabs>
          <Tab active>Details</Tab>
          <Tab onClick={notImplemented}>Dontation History</Tab>
        </Tabs>
        <Markdown>{`
## Introduction
Some description about the project

- List
- Items
- Go here
        `}</Markdown>
      </Container>
    </Layout>
  );
};

export default ViewRoundPage;
