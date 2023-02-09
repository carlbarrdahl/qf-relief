import {
  ReactElement,
  cloneElement,
  PropsWithChildren,
  useRef,
  useState,
} from "react";

import { ImagePlus } from "lucide-react";

export const ImageUpload = ({ children }: PropsWithChildren) => {
  const ref = useRef<HTMLInputElement>(null);
  const [src, setSrc] = useState("");

  return (
    <div className="relative">
      <div className="absolute bottom-4 right-4 z-10">
        <div
          onClick={() => ref.current?.click()}
          className="flex cursor-pointer items-center justify-center rounded bg-white p-2 text-stone-800"
        >
          <ImagePlus className="h-6 w-6" />
        </div>

        <input
          onChange={(e) => {
            const [file] = e.target.files || [];
            file && setSrc(URL.createObjectURL(file));
          }}
          ref={ref}
          defaultValue={""}
          className="hidden"
          type="file"
          accept="image/png, image/jpeg"
        />
      </div>
      <div>{cloneElement(children as ReactElement<any>, { src })}</div>
    </div>
  );
};
