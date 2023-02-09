import { tv } from "tailwind-variants";
import { createComponent } from "components";
import Image from "next/image";

import clsx from "clsx";
const banner = tv({ base: "h-96 bg-yellow-500" });

export const Wrapper = createComponent("div", banner);

export const Banner = ({ src = "", alt = "", ...props }) => (
  <Wrapper {...props}>
    <Image
      className={clsx("object-cover object-center", { ["hidden"]: !src })}
      fill
      src={src}
      alt={alt}
    />
  </Wrapper>
);
