import axios from "axios";

export const getPostsRequests = async () => await axios.get("/posts");

export const createPostRequests = async (post) => {
  const form = new FormData();
  for (let key in post) {
    form.append(key, post[key]);
  }
  return await axios.post("/posts", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const deletePostRequests = async (_id) =>
  await axios.delete("/posts/" + _id);

export const getPostRequests = async (_id) => await axios.get("/posts/" + _id);

export const updatePostRequests = async (_id, newfields) =>
  await axios.put(`/posts/${_id}`, newfields);
