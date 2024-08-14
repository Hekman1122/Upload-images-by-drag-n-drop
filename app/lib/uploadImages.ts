import axios from "axios";
import FormData from "form-data";

export async function uploadImages(file: File) {
  const data = new FormData();
  data.append("image", file);
  data.append("type", file.type);
  data.append("title", file.name);
  data.append("description", "This is a simple image upload in Imgur");
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.imgur.com/3/image",
    headers: {
      Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`,
    },
    data: data,
  };
  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}
