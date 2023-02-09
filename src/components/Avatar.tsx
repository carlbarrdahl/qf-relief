import Image from "next/image";
import { tv } from "tailwind-variants";

import { createComponent } from "components";

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

const Wrapper = createComponent("div", avatar);

export const Avatar = ({ src = "", alt = "", ...props }) => (
  <Wrapper {...props}>
    {src ? (
      <Image className={"object-contain"} fill src={src} alt={alt} />
    ) : null}
  </Wrapper>
);
