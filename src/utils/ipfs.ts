import { Web3Storage } from "web3.storage";

const ipfsClient = new Web3Storage({
  token: process.env.NEXT_PUBLIC_WEB3_STORAGE_API_KEY as string,
});

export const ipfsUpload = async (data: any, fileName = "metadata.json") => {
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  const file = new File([blob], fileName);
  return ipfsClient.put([file]).then((cid) => `${cid}/${fileName}`);
};
