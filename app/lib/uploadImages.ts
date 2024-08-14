import axios from "axios";
import FormData from "form-data";

export async function uploadImages(file: File) {
  const data = new FormData();
  let f = URL.createObjectURL(file);
  data.append("file", f);
  try {
    const result = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`,
      },
      body: JSON.stringify(f),
    });
    console.log(await result.json());
  } catch (err) {
    console.dir(err);
  }
}
