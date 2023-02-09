import { createComponent } from "components";
import NextLink from "next/link";

import { tv } from "tailwind-variants";

const link = tv({
  base: "text-blue-500 hover:text-blue-700",
  variants: {
    color: {
      primary: "bg-blue-500 hover:bg-blue-700",
      secondary: "bg-purple-500 hover:bg-purple-700",
      success: "bg-green-500 hover:bg-green-700",
    },
  },
});

export const Link = createComponent(NextLink, link);
