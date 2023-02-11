import { Link } from "components/Link";
import { Button } from "components/Button";
import { Avatar } from "components/Avatar";
import { Container } from "components/Container";
import { Banner } from "components/Banner";
import { useFormContext } from "react-hook-form";

import { roundFormConfig, RoundSchema } from "schemas/round";
import { ImageUpload, useIsUploading } from "components/ImageUpload";
import { Form, FormControl, Input, Textarea } from "components/Form";

import { useCreateRound } from "hooks/useCreateRound";
import { useRouter } from "next/router";

const testRound = RoundSchema.parse({
  roundMeta: {
    title: "Test Round",
    description: "Test Round description",
    receiver: "0xebFe5cDeb871B3b99f7194d84A63314622dAe709",
    website: "",
    logoImg: "",
    bannerImg: "",
  },
});

const RoundDetails = () => {
  const { watch } = useFormContext();
  return (
    <div>
      <h2 className="m-0 h-10 text-4xl font-bold">
        {watch("roundMeta.title")}
      </h2>
      <div className="h-6">
        <Link href="#" target={"_blank"}>
          {watch("roundMeta.website")}
        </Link>
      </div>
    </div>
  );
};

export const CreateRoundForm = () => {
  const [isUploading, setUploading] = useIsUploading();

  const router = useRouter();
  const create = useCreateRound({
    onSuccess: ({ address }) => router.push(`/rounds/${address}`),
    // onError: ({ message }) => toast.open({ type: "error", message })
  });

  console.log("isUploading", isUploading);

  const isLoading = isUploading || create.isLoading;
  return (
    <Form
      defaultValues={testRound}
      schema={RoundSchema}
      onSubmit={(values) => {
        console.log(values);
        create.mutate(values);
      }}
    >
      <ImageUpload name="bannerImg">
        <Banner />
      </ImageUpload>
      <Container className="-mt-24 mb-16 flex items-end gap-4">
        <ImageUpload name="logoImg">
          <Avatar size="lg" />
        </ImageUpload>
        <div className="flex flex-1 justify-between">
          <RoundDetails />
          <div>
            <Button type="submit" color="dark" disabled={isLoading}>
              Create round
            </Button>
          </div>
        </div>
      </Container>

      <Container>
        <FormControl name="roundMeta.title" label="Project title">
          <Input placeholder="Round name..." {...roundFormConfig.title} />
        </FormControl>
        <FormControl name="roundMeta.website" label="Website">
          <Input placeholder="https://..." />
        </FormControl>
        <FormControl name="roundMeta.target" label="Raise target">
          <Input type="number" placeholder="$25000" />
        </FormControl>
        <FormControl
          name="roundMeta.receiver"
          label="Receiving wallet address"
          hint="Donations will be sent to this wallet"
        >
          <Input placeholder="0x..." />
        </FormControl>
        <FormControl name="roundMeta.description" label="Description">
          <Textarea rows={10} />
        </FormControl>
      </Container>
    </Form>
  );
};
