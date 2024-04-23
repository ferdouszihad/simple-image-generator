const image_hosting_key = import.meta.env.VITE_IMGBB_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

async function postImageBB(buffer, prompt) {
  try {
    // console.log(buffer);
    const imageFormData = new FormData();
    imageFormData.append(
      "image",
      new Blob([buffer], { type: "image/jpeg" }),
      `${prompt}.jpg`
    );

    const response = await fetch(image_hosting_api, {
      method: "POST",
      // headers: {
      //   "content-type": "multipart/form-data",
      // },
      body: imageFormData,
    });

    const imgData = await response.json();

    return imgData;
  } catch (err) {
    console.log(err);
  }
}
export { postImageBB };
