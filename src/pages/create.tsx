import { type NextPage } from "next";
import { Layout } from "layouts";
import { Link } from "components/Link";
import { Button } from "components/Button";
import { Avatar } from "components/Avatar";
import { Container } from "components/Container";
import { Banner } from "components/Banner";
import { notImplemented } from "utils/notImplemented";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { RoundSchema } from "schemas/round";
import { ImageUpload } from "components/ImageUpload";
import { FormControl, Input, Textarea } from "components/Form";

const CreateRoundPage: NextPage = () => {
  const form = useForm({
    resolver: zodResolver(RoundSchema),
  });

  return (
    <Layout>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit((values) => {
            console.log("form", values);
            notImplemented();
          })}
        >
          <ImageUpload>
            <Banner />
          </ImageUpload>
          <Container className="-mt-24 mb-16 flex items-end gap-4">
            <ImageUpload>
              <Avatar size="lg" />
            </ImageUpload>
            <div className="flex flex-1 justify-between">
              <div>
                <h2 className="m-0 h-10 text-4xl font-bold">
                  {form.watch("title")}
                </h2>
                <div className="h-6">
                  <Link href="#" target={"_blank"}>
                    {form.watch("website")}
                  </Link>
                </div>
              </div>
              <div>
                <Button type="submit" color="dark">
                  Create round
                </Button>
              </div>
            </div>
          </Container>

          <Container>
            <FormControl name="title" label="Project title">
              <Input placeholder="Round name..." />
            </FormControl>
            <FormControl name="website" label="Website">
              <Input placeholder="https://..." />
            </FormControl>
            <FormControl name="target" label="Raise target">
              <Input type="number" placeholder="$25000" />
            </FormControl>
            <FormControl
              name="receiver"
              label="Receiving wallet address"
              hint="Address donations will be sent to"
            >
              <Input placeholder="0x..." />
            </FormControl>
            <FormControl name="description" label="Description">
              <Textarea rows={10} />
            </FormControl>
          </Container>
        </form>
      </FormProvider>
    </Layout>
  );
};

export default CreateRoundPage;
