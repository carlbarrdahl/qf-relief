import { Button } from "components/Button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { PropsWithChildren } from "react";

export const ConnectWalletButton = ({
  label = "Connect Wallet",
  children,
}: { label: string } & PropsWithChildren) => (
  <ConnectButton.Custom>
    {({ account, openConnectModal, mounted, ...rest }) => {
      console.log(rest, mounted);
      if (!mounted) return null;
      if (account) return children;
      return (
        <Button color="dark" onClick={openConnectModal}>
          {label}
        </Button>
      );
    }}
  </ConnectButton.Custom>
);
