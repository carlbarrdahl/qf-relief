import { type NextPage } from "next";
import NextLink from "next/link";
import { Layout } from "layouts";
import { Link } from "components/Link";
import { Button } from "components/Button";
import { Markdown } from "components/Markdown";
import { Tab, Tabs } from "components/Tabs";
import { Avatar } from "components/Avatar";
import { Container } from "components/Container";
import { Banner } from "components/Banner";
import { notImplemented } from "utils/notImplemented";
import { round } from "data/mock";
import { ConnectWalletButton } from "components/ConnectWalletButton";

const DonateButton = () => {
  return (
    <ConnectWalletButton label="Connect Wallet to Donate">
      <Button onClick={notImplemented} as={NextLink} href="#" color="dark">
        Donate to project
      </Button>
    </ConnectWalletButton>
  );
};
const ViewRoundPage: NextPage = () => {
  return (
    <Layout>
      <Banner src={round.bannerImg} />
      <Container className="-mt-24 flex items-end gap-4">
        <Avatar size="lg" src={round.logoImg} />
        <div className="flex flex-1 justify-between">
          <div>
            <h2 className="m-0 text-4xl font-bold">Round Title</h2>
            <Link href="#" target={"_blank"}>
              https://project-website.xyz
            </Link>
          </div>
          <div>
            <DonateButton />
          </div>
        </div>
      </Container>

      <Container>
        <Tabs>
          <Tab active>Details</Tab>
          <Tab onClick={notImplemented}>Dontation History</Tab>
        </Tabs>
        <Markdown>{`## Introduction
Some description about the project

- List
- Items
- Go here
        `}</Markdown>
      </Container>
      <Container>{/* <ProjectsList /> */}</Container>
    </Layout>
  );
};

const ProjectsList = () => {
  return (
    <div className="flex gap-4 py-24">
      {Array.from({ length: 4 }, (v, i) => ({
        projectId: i + 1,
        title: "Project " + i + 1,
      })).map((project) => (
        <div key={project.projectId} className="w-48 rounded shadow-xl">
          <Avatar className="h-24 w-full" />
          <div className="p-4">
            <div className="">{project.title}</div>
            <div className="text-sm text-gray-600">{"description..."}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewRoundPage;
