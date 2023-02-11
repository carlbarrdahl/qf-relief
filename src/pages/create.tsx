import { type NextPage } from "next";
import { Layout } from "layouts";
import { CreateRoundForm } from "features/create-round/components/CreateRoundForm";

const CreateRoundPage: NextPage = () => {
  return (
    <Layout>
      <CreateRoundForm />
    </Layout>
  );
};

export default CreateRoundPage;
