import { createComponent } from "components";
import { tv } from "tailwind-variants";

const avatar = tv({
  base: "rounded bg-yellow-300 border-8 border-yellow-400",
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

export const Avatar = createComponent("div", avatar);
