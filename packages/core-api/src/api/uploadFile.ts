import { toFormData } from "axios";
import { constructUrl } from "./constructUrl";
import { hiveFetch } from "./hiveFetch";
import { HiveFileUpload } from "../types";

export const uploadFile = async (
  { path, ...imageFields }: { path: string; [fieldName: string]: string },
  params: {} = {}
) => {
  const formdata = toFormData({
    path,
  });
  Object.keys(imageFields).forEach((key) => {
    const imageField = imageFields[key];
    formdata.append(key, imageField)
  });
  const url = constructUrl("/media/upload", params);
  const resp = await hiveFetch<HiveFileUpload>(url, {
    method: "POST",
    data: formdata,
  });
  return resp.data;
};
