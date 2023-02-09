import {
  ReactElement,
  cloneElement,
  PropsWithChildren,
  useRef,
  useState,
  useCallback,
  ChangeEvent,
} from "react";
import clsx from "clsx";
import { ImagePlus } from "lucide-react";
import { useMutation } from "wagmi";
import { Button } from "./Button";

export const ImageUpload = ({ children }: PropsWithChildren) => {
  const ref = useRef<HTMLInputElement>(null);
  const [src, setSrc] = useState("");

  const upload = useMutation(
    (file: File) =>
      new Promise((r) => {
        setTimeout(() => r({ ipfsHash: "hash" }), 3000);
      })
  );

  const handleUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const [file] = e.target.files || [];
    if (file) {
      setSrc(URL.createObjectURL(file));
      upload.mutate(file);
    }
  }, []);

  return (
    <div className="relative bg-white">
      <div className="absolute bottom-4 right-4 z-10">
        <Button
          disabled={upload.isLoading}
          onClick={() => ref.current?.click()}
        >
          <ImagePlus className="h-6 w-6" />
        </Button>

        <input
          onChange={handleUpload}
          ref={ref}
          defaultValue={""}
          className="hidden"
          type="file"
          accept="image/png, image/jpeg"
        />
      </div>
      <div className={clsx({ ["opacity-50"]: upload.isLoading })}>
        {cloneElement(children as ReactElement<any>, { src })}
      </div>
    </div>
  );
};
