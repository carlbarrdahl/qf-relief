import { type NextPage } from "next";
import NextLink from "next/link";
import { Layout } from "layouts";
import { Link } from "components/Link";
import { Button } from "components/Button";
import { Avatar } from "components/Avatar";
import { Container } from "components/Container";
import { Banner } from "components/Banner";
import { notImplemented } from "utils/notImplemented";
import { createComponent } from "components";
import { tv } from "tailwind-variants";
import { PropsWithChildren, useReducer, useRef } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";

import { ImagePlus } from "lucide-react";
const ImageUpload = ({ children }: { children: ReactElement }) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="relative">
      <div className="absolute bottom-4 right-4">
        {/* <Button  onClick={() => ref.current?.click()}> */}
        <div className="flex cursor-pointer items-center justify-center rounded bg-white p-2 text-stone-800">
          <ImagePlus className="h-6 w-6" />
        </div>
        {/* </Button> */}

        <input
          onChange={(e) => {
            const [file] = e.target.value;
            console.log(file);
          }}
          ref={ref}
          defaultValue={""}
          className="hidden"
          type="file"
          accept="image/png, image/jpeg"
        />
      </div>
      <div>{children}</div>
    </div>
  );
};

const input = tv({
  base: "block w-full p-2 border border-stone-200 focus:outline-yellow-500",
});
const textarea = tv({
  base: "rounded block w-full resize-none rounded border border-stone-200 bg-transparent p-4 focus:outline-indigo-200",
});

const Input = createComponent("input", input);
const Textarea = createComponent("textarea", textarea);

const FormControl = ({
  label,
  children,
}: { label: string } & PropsWithChildren) => (
  <fieldset className="mb-2">
    <label className="text-sm font-bold tracking-wider text-stone-700">
      {label}
    </label>
    {children}
  </fieldset>
);

const CreateRoundPage: NextPage = () => {
  const [state, setState] = useReducer((prev, next) => ({ ...prev, ...next }), {
    title: "",
    website: "",
  });

  console.log(state);
  return (
    <Layout>
      <ImageUpload>
        <Banner />
      </ImageUpload>
      <Container className="-mt-24 mb-16 flex items-end gap-4">
        <ImageUpload>
          <Avatar size="lg" />
        </ImageUpload>
        <div className="flex flex-1 justify-between">
          <div>
            <h2 className="m-0 h-10 text-4xl font-bold">{state.title}</h2>
            <Link href="#" target={"_blank"}>
              {state.website}
            </Link>
          </div>
          <div>
            <Button
              onClick={notImplemented}
              as={NextLink}
              href="#"
              color="dark"
            >
              Create round
            </Button>
          </div>
        </div>
      </Container>

      <Container>
        <FormControl label="Project title">
          <Input
            placeholder="Round name..."
            onChange={(e) => setState({ title: e.target.value })}
          />
        </FormControl>
        <FormControl label="Website">
          <Input
            placeholder="https://..."
            onChange={(e) => setState({ website: e.target.value })}
          />
        </FormControl>
        <FormControl label="Raise target">
          <Input
            type="number"
            placeholder="$25000"
            onChange={(e) => setState({ website: e.target.value })}
          />
        </FormControl>
        <FormControl label="Receiving wallet address">
          <Input placeholder="0x..." />
        </FormControl>
        <FormControl label="Description">
          <Textarea rows={10}>{`## Introduction
Some description about the project

- List
- Items
- Go here`}</Textarea>
        </FormControl>
      </Container>
    </Layout>
  );
};

export default CreateRoundPage;
