import { createComponent } from "components";
import { tv } from "tailwind-variants";

const avatar = tv({
  base: "rounded bg-stone-300",
  variants: {
    size: {
      sm: "",
      md: "w-32 h-32",
      lg: "w-48 h-48",
    },
  },

  defaultVariants: {
    size: "md",
  },
});

export const Avatar = createComponent("avatar", avatar);
