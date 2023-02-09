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
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import {
  ReactElement,
  cloneElement,
  PropsWithChildren,
  useReducer,
  useRef,
  useState,
} from "react";

import { ImagePlus } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { RoundSchema } from "schemas/round";

const ImageUpload = ({ children }: PropsWithChildren) => {
  const ref = useRef<HTMLInputElement>(null);
  const [src, setSrc] = useState("");

  return (
    <div className="relative">
      <div className="absolute bottom-4 right-4 z-10">
        <div
          onClick={() => ref.current?.click()}
          className="flex cursor-pointer items-center justify-center rounded bg-white p-2 text-stone-800"
        >
          <ImagePlus className="h-6 w-6" />
        </div>

        <input
          onChange={(e) => {
            const [file] = e.target.files || [];
            file && setSrc(URL.createObjectURL(file));
          }}
          ref={ref}
          defaultValue={""}
          className="hidden"
          type="file"
          accept="image/png, image/jpeg"
        />
      </div>
      <div>{cloneElement(children as ReactElement<any>, { src })}</div>
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

const RoundAvatar = ({ alt = "", src = "" }) => (
  <Avatar size="lg">
    <Image
      className={clsx("object-contain", { ["hidden"]: !src })}
      fill
      src={src}
      alt={alt}
    />
  </Avatar>
);

const FormControl = ({
  name,
  label,
  hint,
  children,
}: { name: string; label: string; hint?: string } & PropsWithChildren) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  console.log(errors);
  const error = errors[name];
  return (
    <fieldset className="mb-2">
      <label
        htmlFor={name}
        className="text-sm font-bold tracking-wider text-stone-700"
      >
        {label}
      </label>
      {cloneElement(children as ReactElement, {
        id: name,
        ...register(name),
      })}
      {hint ? <div className="text-xs text-stone-500">{hint}</div> : null}
      {error ? (
        <div className="text-xs text-red-500">{error.message as string}</div>
      ) : null}
    </fieldset>
  );
};
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
              <RoundAvatar />
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
