import Image from "next/image";
import { tv } from "tailwind-variants";

import { createComponent } from "components";

const avatar = tv({
  base: "rounded bg-cyan-300 border-cyan-400 relative",
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

const Wrapper = createComponent("div", avatar);

export const Avatar = ({ src = "", alt = "", ...props }) => (
  <Wrapper {...props}>
    {src ? (
      <Image className={"rounded object-cover"} fill src={src} alt={alt} />
    ) : null}
  </Wrapper>
);
