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
import { ipfsUpload } from "utils/ipfs";
import { useFormContext } from "react-hook-form";
import { createGlobalState } from "react-use";

export const useIsUploading = createGlobalState<boolean>(false);

export const ImageUpload = ({
  name,
  children,
}: { name: string } & PropsWithChildren) => {
  const ref = useRef<HTMLInputElement>(null);
  const [src, setSrc] = useState("");
  const { setValue } = useFormContext();

  const [_, setUploading] = useIsUploading();
  const upload = useMutation(async (file: File) => {
    setUploading(true);
    return ipfsUpload(file).then((cid) => {
      setUploading(false);
      return cid;
    });
  });

  const handleUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const [file] = e.target.files || [];
    if (file) {
      setSrc(URL.createObjectURL(file));
      upload.mutate(file, {
        onSuccess: (cid) => {
          setValue(name, `ipfs://${cid}`);
        },
      });
    }
  }, []);

  return (
    <div className="relative bg-white">
      <div className="absolute bottom-4 right-4 z-10">
        <Button
          size="sm"
          disabled={upload.isLoading}
          onClick={() => ref.current?.click()}
        >
          <ImagePlus className="h-4 w-4" />
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
