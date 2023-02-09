import { tv } from "tailwind-variants";

import { createComponent } from "components";

const tabs = tv({
  base: "py-4 text-md flex gap-8 tracking-wider text-stone-500",
});

const tab = tv({
  base: "cursor-pointer hover:text-stone-700",
  variants: {
    active: { true: "font-bold text-stone-900" },
  },
});

export const Tabs = createComponent("div", tabs);
export const Tab = createComponent("div", tab);
