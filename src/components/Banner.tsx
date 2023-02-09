import { tv } from "tailwind-variants";
import { createComponent } from "components";
import Image from "next/image";

const banner = tv({ base: "h-96 bg-yellow-500 relative" });

const Wrapper = createComponent("div", banner);

export const Banner = ({ src = "", alt = "", ...props }) => (
  <Wrapper {...props}>
    {src ? (
      <Image
        className={"object-cover object-center"}
        fill
        src={src}
        alt={alt}
      />
    ) : null}
  </Wrapper>
);
