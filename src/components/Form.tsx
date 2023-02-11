import { cloneElement, PropsWithChildren, ReactElement } from "react";
import {
  FormProvider,
  UseFormProps,
  useFormContext,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tv } from "tailwind-variants";

import { createComponent } from "components";
import { z } from "zod";

const input = tv({
  base: "block w-full p-2 border border-stone-200 focus:outline-yellow-500",
});
const textarea = tv({
  base: "rounded block w-full resize-none rounded border border-stone-200 bg-transparent p-4 focus:outline-indigo-200",
});
const label = tv({
  base: "text-sm font-bold tracking-wider text-stone-700",
});

export const Input = createComponent("input", input);
export const Textarea = createComponent("textarea", textarea);
export const Label = createComponent("label", label);

export const FormControl = ({
  name,
  label,
  hint,
  children,
}: { name: string; label: string; hint?: string } & PropsWithChildren) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  return (
    <fieldset className="mb-2">
      <Label htmlFor={name}>{label}</Label>
      {cloneElement(children as ReactElement, { id: name, ...register(name) })}
      {hint ? <div className="text-xs text-stone-500">{hint}</div> : null}
      {error ? (
        <div className="text-xs text-red-500">{error.message as string}</div>
      ) : null}
    </fieldset>
  );
};

export interface FormProps<S extends z.ZodType<any, any>>
  extends PropsWithChildren {
  defaultValues?: UseFormProps<z.infer<S>>["defaultValues"];
  schema: S;
  onSubmit: (values: z.infer<S>) => void;
}

export function Form<S extends z.ZodType<any, any>>({
  defaultValues,
  schema,
  children,
  onSubmit,
}: FormProps<S>) {
  // Initialize the form with defaultValues and schema for validation
  const form = useForm({ defaultValues, resolver: zodResolver(schema) });
  // Pass the form methods to a FormProvider. This lets us access the form from components without passing props.
  console.log(form.watch());
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
