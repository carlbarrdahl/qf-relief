import { tv } from "tailwind-variants";
import { createComponent } from "components";

const banner = tv({ base: "h-96 bg-yellow-500" });

export const Banner = createComponent("div", banner);
