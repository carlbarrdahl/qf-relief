import { createComponent } from "components";
import { tv } from "tailwind-variants";

const button = tv({
  base: "inline-flex items-center bg-stone-900 tracking-wide text-stone-50 rounded-md active:opacity-90 transition-colors",
  variants: {
    color: {
      default: "bg-stone-200 hover:bg-stone-300 text-stone-900",
      dark: "bg-stone-800 text-stone-50",
    },
    size: {
      sm: "p-2 text-sm",
      md: "px-3 py-2 text-base",
      lg: "px-4 py-3 text-lg",
    },
    disabled: {
      true: "opacity-50 pointer-events-none",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    size: "md",
    color: "default",
  },
});

export const Button = createComponent("button", button);
