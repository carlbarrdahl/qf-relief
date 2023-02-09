import { cloneElement, PropsWithChildren, ReactElement } from "react";
import { useFormContext } from "react-hook-form";
import { tv } from "tailwind-variants";

import { createComponent } from "components";

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
