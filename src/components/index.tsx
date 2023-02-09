import {
  ComponentPropsWithRef,
  forwardRef,
  ReactNode,
  ElementType,
} from "react";
import {
  TV,
  TVProps,
  TVReturnProps,
  TVReturnType,
  TVSlots,
} from "tailwind-variants";

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

export type ComponentProps<C extends ElementType> = {
  as?: C;
  children?: ReactNode;
} & ComponentPropsWithRef<C>;

// TODO: How to get props typings for the TV props (eg, color)?
export const createComponent = (
  tag: string | ElementType,
  variant: TVReturnType<any, any, TVSlots, TVSlots, string>
) => {
  const Comp = forwardRef(
    <C extends ElementType>(
      { as, className, ...props }: ComponentProps<C>,
      ref?: PolymorphicRef<C>
    ) => {
      const Component = as || tag;
      return (
        <Component
          ref={ref}
          className={variant({ class: className, ...props })}
          {...props}
        />
      );
    }
  );
  // Comp.displayName = tag;
  return Comp;
};
