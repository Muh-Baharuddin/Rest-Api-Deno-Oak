import * as base64 from "https://denopkg.com/chiefbiiko/base64@master/mod.ts";
import { FormDataBody } from "$oak/mod.ts";
import { ResponseImage } from "/items/image/images.types.ts";

export const uploadImage = async (data: FormDataBody) => {
  const form = new FormData();
    
  const file = data.files![0].content!;
  const stringData = base64.fromUint8Array(file);
  form.append("image", stringData);

  const ApiKey = Deno.env.get("IMGBB_KEY");
  const url = `https://api.imgbb.com/1/upload?key=${ApiKey}`;

  const res = await fetch(url, {
    method: "POST",
    body: form,
  })
  const jsonData: ResponseImage = await res.json();

  return {
    url: jsonData.data.image.url
  }
}

