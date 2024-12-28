import { HiveFileUpload } from "../types";
import { constructUrl } from "./constructUrl";
import { hiveFetch } from "./hiveFetch";

export const uploadFiles = async (
  {
    path,
    files,
  }: {
    path: string;
    files: {
      [fieldName: string]: {
        uri: string;
        name: string;
        type: string; //Meme type
      };
    };
  },
  params: {} = {}
) => {
  const formData = new FormData();
  // Add the path
  formData.append("path", path);
  // Add the file
  Object.keys(files).forEach((fieldName) => {
    formData.append(fieldName, files[fieldName] as any);
  });

  const url = constructUrl("/media/upload", params);
  const resp = await hiveFetch<HiveFileUpload>(url, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });

  return resp.data;
};
